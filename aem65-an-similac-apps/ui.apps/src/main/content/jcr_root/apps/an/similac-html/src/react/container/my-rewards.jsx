import React from "react";
import { makeCall } from "../common/api";

export default class MyRewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPoints: "",
      NextPoints: "",
      checkPWA: false
    };
    this.donutRef = React.createRef();
    this.checkLogin = this.checkLogin.bind(this);
  }

  handlePopupClick = () => {
    $('#how-to-earn-popup').modal("show");
    ABBOTT.gtm.buildAndPush.formTracking(
      "internal-link",
      "click-event",
      "pwa-how-to-earn-link"
    );
  };

  componentDidMount() {
    var checked = this.checkPWA();
    this.setState({
      checkPWA: checked
    });
    if(checked){
      window.onload = () => {
        const anchor = document.querySelector('.rewards-container-earn a');
        if (anchor) {
          anchor.addEventListener('click', this.handlePopupClick);
        }
      };
      this.getProfileInfoPWA();
    }else{
    this.getProfileInfo();
    }
    if(window.jQuery.fn.donut){
      window.jQuery(this.donutRef.current).donut();
    }
  }

  componentDidUpdate(){
    if(window.jQuery.fn.donut){
      window.jQuery(this.donutRef.current).data("value",+this.state.currentPoints);
      window.jQuery(this.donutRef.current).data("total",+this.state.nextPoints);
      window.jQuery(this.donutRef.current).donut();
    }
  }

  checkLogin() {
    return ABBOTT.cookie("x-id-token");
  }

  getProfileInfo = () => {
    const { actionPath } = this.props.data;
    let ajaxConfigOnLoad = {
      url: actionPath,
      method: "GET",
      headers: {
        "x-id-token": this.checkLogin()
      }
    };
    makeCall(ajaxConfigOnLoad).then(resultData => {
      const iterator = resultData.response.children.keys();
      const $full_rewards_WIC = jQuery('.full_rewards_WIC');
      const $full_rewards_NONWIC = jQuery('.full_rewards_NONWIC');
      for (const key of iterator) {
        const children = resultData.response.children[key];
        if (children.activeChild === true) {
          if (children.loyaltyPointsSinceLastReward !== "0") {

            this.setState({
              currentPoints: children.loyaltyPointsSinceLastReward,
              nextPoints: children.loyaltyPointsToNextReward
            }, () => {
            if (children.wicSegment === "WIC") {
              $full_rewards_WIC.show();
            }
            else if(children.wicSegment === "NONWIC") {
              $full_rewards_NONWIC.show();
            }
            });

            return;
          } else if (children.loyaltyPointsSinceLastReward === "0" || !children.loyaltyPointsSinceLastReward) {
            
            if (children.wicSegment === "WIC") {
              this.setState({
                currentPoints: "",
                nextPoints: children.loyaltyPointsToNextReward

              }, () => {
                $full_rewards_WIC.show();
              });
            }
            else if (children.wicSegment === "NONWIC") {
           
              this.setState({
                currentPoints: "",
                nextPoints: children.loyaltyPointsToNextReward
              }, () => {
               $full_rewards_NONWIC.show();
              });
            }

          }
        }

      }
     
    }, (fail) => {
      console.log(fail);
  });
  };

  getProfileInfoPWA = () => {
    const { actionPath } = this.props.data;
    let ajaxConfigOnLoad = {
      url: actionPath,
      method: "GET",
      headers: {
        "x-id-token": this.checkLogin()
      }
    };
    makeCall(ajaxConfigOnLoad).then(resultData => {
      const iterator = resultData.response.children.keys();
      const $full_rewards_WIC = jQuery('.full_rewards_WIC');
      const $full_rewards_NONWIC = jQuery('.full_rewards_NONWIC');
      for (const key of iterator) {
        const children = resultData.response.children[key];
        if (children.activeChild === true) {
          jQuery('.donutPWA').removeAttr('style');
          if (children.loyaltyPointsSinceLastReward !== "0") {
            this.setState({
              currentPoints: children.loyaltyPointsSinceLastReward,
              nextPoints: children.loyaltyPointsToNextReward
            }, () => {
              if (children.wicSegment === "WIC") {
                $full_rewards_WIC.show();
              }
              else if (children.wicSegment === "NONWIC") {
                $full_rewards_NONWIC.show();
              }
            });
            return;
          } else if (children.loyaltyPointsSinceLastReward === "0" || !children.loyaltyPointsSinceLastReward) {
            if (children.wicSegment === "WIC") {
              this.setState({
                currentPoints: "",
                nextPoints: children.loyaltyPointsToNextReward
              }, () => {
                $full_rewards_WIC.show();
              });
            }
            else if (children.wicSegment === "NONWIC") {
              this.setState({
                currentPoints: "",
                nextPoints: children.loyaltyPointsToNextReward
              }, () => {
                $full_rewards_NONWIC.show();
              });
            }

          }else{
            this.addPWADonutEmptyRing();
          }
        }else{
          this.addPWADonutEmptyRing();
        }
      }

    }, (fail) => {
      console.log(fail);
    });
  };

  addPWADonutEmptyRing = () => {
    jQuery('.donutPWA').css({
      'width': '30px',
      'height': '30px',
      'border': '3px solid #fff',
      'border-radius': '50%'
    });
  }

  checkPWA() {
    if (window.location.href.indexOf("/app/") > -1) {
      return true;
    }
    return false;
  }

  render() {
    //Hide Banner pop up
    $(".modal-close-earn-reward").click((e) => {
      $('#how-to-earn-popup').modal("hide");
    });

    const { currentPoints, nextPoints, rewardsChart, newUserMessage, howToEarnText, howToEarnLink, howToEarnIcon } = this.props.data;
    return (
      <>
      {
        this.state.checkPWA ?
          <div className="rewards-container">
            <div className="rewards-container-row">
            <div className="reward-left col-sm-6">
              {this.state.currentPoints > 0 && (
                <>
                  <div className="reward-left-value">{this.state.currentPoints}</div>
                </>
                )}
              <div className="reward-left-points">{(() => this.state.currentPoints ? 'Current points' : newUserMessage)()}</div>
            </div>
            <div className="reward-right col-sm-6">
              <div className="reward-donut">
                <div ref={this.donutRef} className="donutPWA" data-value={this.state.currentPoints} data-total={this.state.nextPoints || 35}></div>
              </div>
              <div className="reward-donut-desc">You are {this.state.nextPoints || 35} points away from your next reward</div>
            </div>
            </div>
            <div className="rewards-container-earn">
              <div class="column"><span className="col-text"><a id="how-to-earn-link">{howToEarnText}</a></span><span className="col-img"><img src={howToEarnIcon} /></span></div>
            </div>
          </div>
          :
        <div className="shaded-bg text-center mb-4_063 show-rewards d-lg-flex">
          <div className="col-lg-6 border-grey p-8 m-auto">
            <p className="points-dynamic">{this.state.currentPoints}</p>
            <p className="mb-0">{(() => this.state.currentPoints ? currentPoints : newUserMessage)()}</p>
          </div>
          <div className="col-lg-6 d-flex p-8">
            <div className="next-reward-chart auto-shrink mr-0_938">
              <div ref={this.donutRef} className="donut" data-value={this.state.currentPoints} data-total={this.state.nextPoints||35}></div>
            </div>
            <div className="auto-expand text-left m-auto">
              <p className="mb-0">
                <span className="balanceRewards">{this.state.nextPoints} </span>
                {nextPoints}
              </p>
            </div>
          </div>
        </div>
      }
      </>
    );
  }
}
