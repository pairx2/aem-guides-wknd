import Greeting from '../modules/MyAccount/components/Greeting/Greeting';
import MiniCartHeader from '../modules/Cart/components/MiniCart/MiniCart';
import MinicartPopup from '../modules/Cart/components/MiniCart/MinicartPopup';
import Login from '../modules/Authentication/components/Login/LoginForm';
import ProductDetails from '../modules/Product/components/ProductDetails/ProductDetails';
import CartListPage from '../modules/Cart/components/CartListPage/CartListPage';
import LoginHeader from '../modules/Authentication/components/LoginHeader/LoginHeader';
import ClickToCall from '../modules/Contact/components/ClickToCall/ClickToCall';
import LoginHeaderMobile from '../modules/Authentication/components/LoginHeader/LoginHeaderMobile';
import LoginListMobile from '../modules/Authentication/components/LoginHeader/LoginListMobile';
import StickyAddToCart from '../modules/Product/components/StickyAddToCart/StickyAddToCart';
import CartOverview from '../modules/Cart/components/CartOverview/CartOverview';
import ShippingOptions from '../modules/Cart/components/ShippingOptions/ShippingOptions';
import ConfirmationPage from '../modules/Confirmation/components/ConfirmationPage';
import RegistrationForm from '../modules/Authentication/components/Registration/RegistrationForm';
import CouponCodeForm from '../modules/Cart/components/CouponCode/CouponCodeForm';
import Modal from '../modules/Modal/components/modal';
import AddressCheckout from '../modules/Address/components/AddressCheckout/AddressCheckout';
import AccountContactDetails from '../modules/MyAccount/components/ContactDetails/AccountContactDetails';
import PrescriptionCheckout from '../modules/MyAccount/components/PrescriptionCheckout/PrescriptionCheckout';
import PrescriptionAccount from '../modules/MyAccount/components/PrescriptionAccount/PrescriptionAccount';
import AccountAddress from '../modules/MyAccount/components/AccountAddress/AccountAddress';
import OrderHistory from '../modules/MyAccount/components/OrderHistory/OrderHistory';
import PlusService from '../modules/MyAccount/components/PlusService/PlusService';
import CurrentOrderOverview from '../modules/MyAccount/components/CurrentOrderOverview/CurrentOrderOverview';
import Deeplink from '../modules/MyAccount/components/Deeplink/Deeplink';
import MessageBannerComponent from '../modules/Generic/components/MessageBanner/MessageBannerComponent';
import WebToCase from '../modules/Contact/components/WebToCase/WebToCase';
import CallBack from '../modules/Contact/components/CallBack/CallBack';
import ForgotPassword from '../modules/Authentication/components/ForgotPassword/ForgotPassword';
import ResetPassword from '../modules/Authentication/components/PasswordReset/ResetPassword';
import InsuranceDisplay from '../modules/MyAccount/components/InsuranceDisplayEdit/InsuranceDisplayEdit';
import SearchForm from '../modules/Search/components/SearchForm/SearchForm';
import CustomerInfo from '../modules/MyAccount/components/CustomerInfo/CustomerInfo';
import WizardInsuranceDisplay from '../modules/RXWizard/components/WizardInsuranceDisplay/WizardInsuranceDisplay';
import WizardSelector from '../modules/RXWizard/components/WizardSelector/WizardSelector';
import SickFundSearch from '../modules/SickFund/components/SickFundSearch';
import SimpleProductPrice from '../modules/Product/components/SimpleProductPrice/SimpleProductPrice';
import TestimonialCarousel from '../modules/Carousel/components/TestimonialCarousel/TestimonialCarousel';
import Testimonial from '../modules/Carousel/components/TestimonialCarousel/Testimonial';
import ImageCarousel from '../modules/Carousel/components/ImageCarousel/ImageCarousel';
import VideoCarousel from '../modules/Carousel/components/VideoCarousel/VideoCarousel';
import ProgressBar from '../modules/Generic/components/ProgressBar/ProgressBar';
import Banner from '../modules/Banner/components/Banner';
import Panel from '../modules/Generic/components/Panel/Panel';
import PanelList from '../modules/Generic/components/Panel/PanelList';
import SearchResult from '../modules/Search/components/SearchResults/SearchResults';
import SearchOverlay from '../modules/Search/components/SearchOverlay/SearchOverlay';
import SearchBar from '../modules/Search/components/SearchBar/SearchBar';
import SoftwareDownload from '../modules/MyAccount/components/SoftwareDownload/SoftwareDownload';
import Payment from '../modules/Payment/components/Payment';
import Success from '../modules/Contact/components/Success/Success';
import PasswordDisplayEdit from '../modules/MyAccount/components/PasswordDisplayEdit/PasswordDisplayEdit';
import NewsletterSignup from '../modules/NewsletterSignup/components/NewsletterSignup';
import PaymentDisplayEdit from '../modules/Payment/components/PaymentDisplayEdit/PaymentDisplayEdit';
import ProductCard from '../modules/Product/components/ProductCard/ProductCard';
import SocialShare from '../modules/SocialShare/components/SocialShare';
import BluedoorLogin from '../modules/Authentication/components/BluedoorLogin/BluedoorLogin';
import DocumentUpload from '../modules/MyAccount/components/Documents/DocumentUpload';
import OrderOverview from "../modules/MyAccount/components/OrderOverview/OrderOverview";
import AccountVerificationBanner from '../modules/Authentication/components/AccountVerificationBanner/AccountVerificationBanner';
import MultiProductDetails from '../modules/Product/components/ProductDetails/MultiProductDetails';
import ConfirmTechnicalTraining from "../modules/MyAccount/components/ConfirmTechnicalTraining/ConfirmTechnicalTraining";
import PrescriptionReminder from '../modules/MyAccount/components/PrescriptionReminder/PrescriptionReminder';
import PlusServiceCancellation from '../modules/PlusServiceCancellation/components/PlusServiceCancellation';
import NextgenCarousal from '../modules/Carousel/components/NextgenCarousal/NextgenCarousal';
import RefundReshipWidget from '../modules/MyAccount/components/RefundReshipWeget/RefundReshipWidget';
import ArvatoTrackAndTraceWidget from '../modules/ArvatoTrackAndTraceWidget/components/ArvatoTrackAndTraceWidget';
import OrderDocumentList from '../modules/MyAccount/components/OrderDocumentList/OrderDocumentList';
import OfflineToOnline from '../modules/OfflineToOnline/components/OfflineToOnline';

const components = {
	/* map your component here */
	/* componentName: ComponentName */
	greeting: Greeting,
	miniCartHeader: MiniCartHeader,
	miniCartPopup: MinicartPopup,
	cartList: CartListPage,
	login: Login,
	productDetails: ProductDetails,
	loginHeader: LoginHeader,
	clickToCall: ClickToCall,
	loginHeaderMobile: LoginHeaderMobile,
	loginListMobile: LoginListMobile,
	stickyAddtocart: StickyAddToCart,
	cartOverview: CartOverview,
	shippingOptions: ShippingOptions,
	registration: RegistrationForm,
	confirmation: ConfirmationPage,
	couponCode: CouponCodeForm,
	modal: Modal,
	addressCheckout: AddressCheckout,
	accountContactDetails: AccountContactDetails,
	prescriptionCheckout: PrescriptionCheckout,
	accountAddress: AccountAddress,
	prescriptionAccount: PrescriptionAccount,
	orderHistory: OrderHistory,
	plusService: PlusService,
	forgotPassword: ForgotPassword,
	resetPassword: ResetPassword,
	currentOrder: CurrentOrderOverview,
	orderOverview: OrderOverview,
	deepLink: Deeplink,
	messageBanner: MessageBannerComponent,
	webToCase: WebToCase,
	callBack: CallBack,
	accountInsuranceDisplayEdit: InsuranceDisplay,
	faqSearchForm: SearchForm,
	wizardSelector: WizardSelector,
	wizardInsuranceDisplay: WizardInsuranceDisplay,
	customerInfo: CustomerInfo,
	banner: Banner,
	productPrice: SimpleProductPrice,
	progressBar: ProgressBar,
	sickFundSearch: SickFundSearch,
	testimonial: Testimonial,
	testimonialCarousel: TestimonialCarousel,
	imageCarousel: ImageCarousel,
	videoCarousel: VideoCarousel,
	panel: Panel,
	searchResult: SearchResult,
	searchOverlay: SearchOverlay,
	searchBar: SearchBar,
	softwareDownload: SoftwareDownload,
	success: Success,
	payment: Payment,
	passwordDisplayEdit: PasswordDisplayEdit,
	newsletterSignup: NewsletterSignup,
	paymentDisplayEdit: PaymentDisplayEdit,
	productCard: ProductCard,
	socialshare: SocialShare,
	panelList:PanelList,
	bluedoorLogin:BluedoorLogin,
	documentUpload: DocumentUpload,
	accountVerificationBanner: AccountVerificationBanner,
	confirmTechnicalTraining:ConfirmTechnicalTraining,
	multiProductDetails: MultiProductDetails,
	prescriptionReminder: PrescriptionReminder,
	plusServiceCancellation: PlusServiceCancellation,
	nexgenCarousel: NextgenCarousal,
	refundReshipWidget: RefundReshipWidget,
	arvatoTrackAndTraceWidget: ArvatoTrackAndTraceWidget,
	orderDocumentList: OrderDocumentList,
	registrationOffline: OfflineToOnline
};

export const getComponentByTitle = componentTitle => {
	if (components[componentTitle]) {
		return components[componentTitle];
	} else {
		console.warn(`"${componentTitle}" can't be mapped to a React component. Make sure that the component is added to the mapping: `, components);
		return undefined;
	}
};

export const getComponentData = jsonString => {
	try {
		return JSON.parse(jsonString);
	} catch {
		return {};
	}
};