import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withBreakpoints } from 'react-breakpoints';
import Icon from '../../Generic/components/Icon/Icon';
import { isSafari } from '../../../utils/regexUtils';
import { POSITION_TYPES } from '../../../utils/enums';
let currentIndex = 0;
let slider;

class Carousel extends Component {
	static defaultProps = {
		itemsToShowDesktop: 1,
		hasArrows: false,
		arrowLeftIcon: 'arrow-left',
		arrowRightIcon: 'arrow-right',
		animationTime: 0.3,
		controlPosition: POSITION_TYPES.TOP,
		isNexgenCarousel: false
	};

	static propTypes = {
		itemsToShowMobile: PropTypes.number,
		itemsToShowTablet: PropTypes.number,
		itemsToShowDesktop: PropTypes.number,
		scrollByMobile: PropTypes.number,
		scrollByTablet: PropTypes.number,
		scrollByDesktop: PropTypes.number,
		hasArrows: PropTypes.bool,
		canAutoSlide: PropTypes.bool,
		arrowLeftIcon: PropTypes.string,
		arrowRightIcon: PropTypes.string,
		controlComponentMobile: PropTypes.func,
		controlComponentTablet: PropTypes.func,
		controlComponentDesktop: PropTypes.func,
		animationTime: PropTypes.number,
		controlPosition: PropTypes.oneOf([...Object.values(POSITION_TYPES)]),
		items: PropTypes.array,
		isNexgenCarousel: PropTypes.bool
	};

	state = {
		currentIndex: 0,
		animating: false,
		startAutoSlide: false,
		currentPosition: 0
	};

	componentDidMount() {
		const { canAutoSlide, isNexgenCarousel } = this.props;
		window.addEventListener('resize', () => {
			const element = this.carouselRef;
			if (element) {
				if (element.scrollLeft < element.scrollWidth - element.clientWidth) {
					element.scrollLeft++;
					element.scrollLeft--;
				} else {
					element.scrollLeft--;
					element.scrollLeft++;
				}
			}
		});
		canAutoSlide && this.autoSlideStart();
		isNexgenCarousel && this.carouselRef && this.next();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentBreakpoint !== this.props.currentBreakpoint) {
			this.carouselRef.scrollLeft = this.state.currentIndex * this.getItemWidth();
		}
		currentIndex = this.state.currentIndex;
	}

	autoSlide = () => {
		const { children } = this.props;
		if (currentIndex === children?.length - 1) {
			this.goTo(0);
			currentIndex = 0;
		} else {
			this.goTo(currentIndex + 1);
			currentIndex++;
		}
	}

	autoSlideStart() {
		slider = setInterval(this.autoSlide, 5000);
		this.setState({ startAutoSlide: false });
	}

	autoSlideStop() {
		clearInterval(slider);
		this.setState({ startAutoSlide: true });
	}

	onScroll = e => {
		const scrollPosition = e.target?.scrollLeft;
		if (!this.props.isNexgenCarousel) {
			this.setState({
				currentIndex: Math.round(scrollPosition / this.getItemWidth())
			});
		}
	};

	getControlComponent = () => {
		const { breakpoints, currentBreakpoint } = this.props;
		const { controlComponentMobile, controlComponentTablet, controlComponentDesktop } = this.props;
		switch (breakpoints[currentBreakpoint]) {
			case breakpoints.mobile:
				return controlComponentMobile || controlComponentTablet || controlComponentDesktop;
			case breakpoints.tablet:
				return controlComponentTablet || controlComponentDesktop;
			default:
				return controlComponentDesktop;
		}
	};

	getItemWidth = () => {
		const outer = this.carouselRef;
		return outer?.firstChild?.clientWidth;
	};

	getItemsToShow = () => {
		const { breakpoints, currentBreakpoint } = this.props;
		const { itemsToShowMobile, itemsToShowTablet, itemsToShowDesktop } = this.props;
		switch (breakpoints[currentBreakpoint]) {
			case breakpoints.mobile:
				return itemsToShowMobile || itemsToShowTablet || itemsToShowDesktop;
			case breakpoints.tablet:
				return itemsToShowTablet || itemsToShowDesktop;
			default:
				return itemsToShowDesktop;
		}
	};

	getScrollBy = () => {
		const { breakpoints, currentBreakpoint } = this.props;
		const { scrollByMobile, scrollByTablet, scrollByDesktop } = this.props;
		switch (breakpoints[currentBreakpoint]) {
			case breakpoints.mobile:
				return scrollByMobile || scrollByTablet || scrollByDesktop || this.getItemsToShow();
			case breakpoints.tablet:
				return scrollByTablet || scrollByDesktop || this.getItemsToShow();
			default:
				return scrollByDesktop || this.getItemsToShow();
		}
	};

	animateScroll = (element, scrollTo, direction, _delta, targetIndex) => {
		const { isNexgenCarousel } = this.props;
		const fps = 60;
		const frames = fps * this.props.animationTime;
		const delta = _delta || Math.ceil(Math.abs(scrollTo - element?.scrollLeft) / frames);
		const currentDirection = Math.sign(scrollTo - element?.scrollLeft);
		const futureDirection = Math.sign(scrollTo - (element?.scrollLeft + (direction * delta)));
		const { startAutoSlide } = this.state;
		if (( isNexgenCarousel || !isSafari) && currentDirection === direction && futureDirection === direction && (element?.scrollLeft < element?.scrollWidth - element?.clientWidth || currentDirection === -1)) {
			this.setState({ animating: true });
			element.scrollLeft = element?.scrollLeft + (direction * delta);
			const currentAnimation = requestAnimationFrame(() => this.animateScroll(element, scrollTo, direction, delta, targetIndex));
			this.setState({ animation: currentAnimation });
		} else {
			element.scrollLeft = scrollTo;
			this.setState({ animating: false, currentIndex: targetIndex, currentPosition: scrollTo });
		}
		if (startAutoSlide) this.autoSlideStart();
	};

	canIncrement = () => {
		const { isNexgenCarousel } = this.props;
		if (isNexgenCarousel) {
			return this.state.currentIndex < this.props.children?.length - this.getItemsToShow() - 1;
		} else {
			return this.state.currentIndex < this.props.children?.length - this.getItemsToShow();
		}
	};

	canDecrement = () => {
		const { isNexgenCarousel } = this.props;
		if (isNexgenCarousel) {
			return this.state.currentIndex > 1;
		} else {
			return this.state.currentIndex > 0;
		}
	};

	goTo = (targetIndex, stopAutoSlide = false) => {
		const { isNexgenCarousel } = this.props;
		if (stopAutoSlide) this.autoSlideStop();
		cancelAnimationFrame(this.state.animation);
		isNexgenCarousel ? this.animateScroll(this.carouselRef, targetIndex * this.getItemWidth() - this.diffVariable(), Math.sign(targetIndex - this.state.currentIndex), 17, targetIndex) : this.animateScroll(this.carouselRef, targetIndex * this.getItemWidth(), Math.sign(targetIndex - this.state.currentIndex), null, targetIndex);
	};
	diffVariable = () => {
		const { breakpoints, currentBreakpoint } = this.props;
		const tabletDiff = (3.13 / 100) * window.innerWidth; const desktopDiff = (11.46 / 100) * Math.min(window.innerWidth , 1440); 
		const mobileDiff = (3.9/ 100) * window.innerWidth;
		switch (breakpoints[currentBreakpoint]) {
			case breakpoints.mobile:
				return mobileDiff;
			case breakpoints.tablet:
				return tabletDiff;
			default:
				return desktopDiff;
		}
	}
	next = () => {
		const { isNexgenCarousel } = this.props;
		const newIndex = Math.min(this.state.currentIndex + this.getScrollBy(), this.props.children?.length);
		cancelAnimationFrame(this.state.animation);
		isNexgenCarousel ? this.animateScroll(this.carouselRef, newIndex * this.getItemWidth() - this.diffVariable(), 1, 17, newIndex) : this.animateScroll(this.carouselRef, newIndex * this.getItemWidth(), 1, null, newIndex);
	};

	prev = () => {
		const { isNexgenCarousel } = this.props;
		const newIndex = Math.max(this.state.currentIndex - this.getScrollBy(), 0);
		cancelAnimationFrame(this.state.animation);
		isNexgenCarousel ? this.animateScroll(this.carouselRef, newIndex * this.getItemWidth() - this.diffVariable(), -1, 17, newIndex) : this.animateScroll(this.carouselRef, newIndex * this.getItemWidth(), -1, null, newIndex);
	};

	referenceCarousel = el => {
		this.carouselRef = el;
	};

	handleEnd = (e) => {
		const elementPosition = this.carouselRef?.scrollLeft;
		const initialPos = this.getItemWidth() - this.diffVariable();
		const lastPos = (this.props.children?.length - 3) * this.getItemWidth() - this.diffVariable();
		const currentPoint = this.state.currentPosition;
		if (elementPosition < initialPos) {
			cancelAnimationFrame(this.state.animation);
			this.animateScroll(this.carouselRef,initialPos, 1, 17, 1) 
		} else if (elementPosition > lastPos) {
			cancelAnimationFrame(this.state.animation);
			this.animateScroll(this.carouselRef,lastPos, -1, 17, (this.props.children?.length - 3)) 
		} else if (currentPoint < elementPosition) {
			cancelAnimationFrame(this.state.animation);
			this.animateScroll(this.carouselRef, currentPoint + this.getItemWidth(), 1, 17, this.state.currentIndex + 1) 
		} else if (currentPoint > elementPosition) {
			cancelAnimationFrame(this.state.animation);
			this.animateScroll(this.carouselRef, currentPoint - this.getItemWidth(), -1, 17, this.state.currentIndex - 1) 
		}
	}

	render() {
		const { className, children, hasArrows, arrowLeftIcon, arrowRightIcon, controlPosition, items, breakpoints, currentBreakpoint , isNexgenCarousel } = this.props;
		const ControlComponent = this.getControlComponent();
		return (
			<>
				{controlPosition === POSITION_TYPES.TOP && ControlComponent && <ControlComponent
					currentIndex={this.state.currentIndex}
					itemsToShow={this.getItemsToShow()}
					max={children?.length}
					next={this.next}
					prev={this.prev}
					breakpoints={breakpoints}
					currentBreakpoint={currentBreakpoint}
					canIncrement={this.canIncrement()}
					canDecrement={this.canDecrement()}
					goTo={this.goTo}
					items={items}
					slide={this.onAutoSlide}
				/>}
				<div className={'adc-carousel__wrapper'}>
					{hasArrows && <Icon image={arrowLeftIcon}
						className={`adc-carousel__prev ${!this.canDecrement() ? 'adc-carousel__prev--disabled' : ''}`}
						onClick={this.prev} />}
					<div
						className={`adc-carousel adc-carousel--${this.getItemsToShow()?.toString().replace('.', '-')} ${this.state.animating ? '' : 'scroll-snap'} ${className ? className : ''}`}
						onScroll={this.onScroll} onTouchEnd={isNexgenCarousel ? this.handleEnd : undefined} ref={this.referenceCarousel}>
						{children?.map((child) => <div key={`carousel-item-${child.key}`}
							className={'adc-carousel__item'}>{child}</div>)}
					</div>
					{hasArrows && <Icon image={arrowRightIcon}
						className={`adc-carousel__next ${!this.canIncrement() ? 'adc-carousel__next--disabled' : ''}`}
						onClick={this.next} />}
				</div>
				{controlPosition === POSITION_TYPES.BOTTOM && ControlComponent && <ControlComponent
					currentIndex={this.state.currentIndex}
					itemsToShow={this.getItemsToShow()}
					max={children?.length}
					next={this.next}
					prev={this.prev}
					breakpoints={breakpoints}
					currentBreakpoint={currentBreakpoint}
					canIncrement={this.canIncrement()}
					canDecrement={this.canDecrement()}
					goTo={this.goTo}
					items={items}
				/>}

			</>


		);
	}
}

export default withBreakpoints(Carousel);