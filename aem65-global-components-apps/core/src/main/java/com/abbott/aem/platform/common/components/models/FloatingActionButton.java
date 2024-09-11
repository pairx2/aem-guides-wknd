package com.abbott.aem.platform.common.components.models;
import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType

public interface FloatingActionButton extends Component{
	
	default String getButtonStyle(){
        throw new UnsupportedOperationException();
    }
	default String getButtonIcon(){
        throw new UnsupportedOperationException();
    }
	default String getButtonColor(){
        throw new UnsupportedOperationException();
    }
	default String getButtonSize(){
        throw new UnsupportedOperationException();
    }
	default String getButtonType(){
        throw new UnsupportedOperationException();
    }
	default String getUrlLink(){
        throw new UnsupportedOperationException();
    }
	default String getTargetNewWindow(){
        throw new UnsupportedOperationException();
    }
	default String getRedirectConfirm(){
        throw new UnsupportedOperationException();
    }
	default String getAnchorName(){
        throw new UnsupportedOperationException();
    }
	default String getMediaId(){
        throw new UnsupportedOperationException();
    }
	default String getPlayerId(){
        throw new UnsupportedOperationException();
    }
	default String getOrgId(){
        throw new UnsupportedOperationException();
    }
	default String getVideoId(){
        throw new UnsupportedOperationException();
    }
	default String getPhoneNumber(){
        throw new UnsupportedOperationException();
    }
	default String getAssetLink(){
        throw new UnsupportedOperationException();
    }
	default String getModalIcon(){
        throw new UnsupportedOperationException();
    }
	default String getModalTitle(){
        throw new UnsupportedOperationException();
    }
	default String getModalUrl(){
        throw new UnsupportedOperationException();
    }
	default String getButtonText(){
        throw new UnsupportedOperationException();
    }
	default String getAriaLabel(){
        throw new UnsupportedOperationException();
    }
	default String getHideOnDesktop(){
        throw new UnsupportedOperationException();
    }
	default String getHideButtonText(){
        throw new UnsupportedOperationException();
    }
	default String getId(){
        throw new UnsupportedOperationException();
    }
	default String getIconPosition(){
        throw new UnsupportedOperationException();
    }
}