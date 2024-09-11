import AddressVerification from '../../Address/components/AddressVerification/AddressVerification';
import CouponCodeModal from '../../Cart/components/CouponCodeModal/CouponCodeModal';
import DeleteOrderAddressConfirmationModal from '../../MyAccount/components/Modal/DeleteOrderAddressConfirmationModal';
import ChangeDeliveryDateModal from '../../MyAccount/components/CurrentOrderOverview/ChangeDeliveryDateModal';
import ConfirmationPageErrorModal from '../../Confirmation/components/ConfirmationPageErrorModal';
import ConfirmationPageLoadingModal from '../../Confirmation/components/ConfirmationPageLoadingModal';
import RegistrationErrorModal from '../../Authentication/components/Registration/RegistrationErrorModal';
import SickFundSearchModal from '../../SickFund/components/SickFundSearchModal';
import RegistrationInProgressModal from '../../Authentication/components/Registration/RegistrationInProgressModal';
import DeleteAccountAddressConfirmationModal from '../../MyAccount/components/Modal/DeleteAccountAddressConfirmationModal';
import ReturnModal from '../../MyAccount/components/OrderHistory/ReturnModal';
import AddToCartErrorModal from '../../MyAccount/components/OrderHistory/AddToCartErrorModal';
import GeneralErrorModal from './GeneralErrorModal';
import DownloadInvoiceErrorModal from '../../MyAccount/components/OrderHistory/DownloadInvoiceErrorModal';
import ChangePaymentMethodModal from '../../MyAccount/components/PlusService/ChangePaymentMethodModal';
import NoPaymentMethodsAvailableModal from '../../MyAccount/components/PlusService/NoPaymentMethodsAvailableModal';
import DeactivatePlusServiceModal from '../../MyAccount/components/PlusService/DeactivatePlusServiceModal';
import DeletePlusServiceModal from '../../MyAccount/components/PlusService/DeletePlusServiceModal';
import PlusServiceUpdatedConfirmationModal
	from '../../MyAccount/components/PlusService/PlusServiceUpdatedConfirmationModal';
import PlusServiceSubscriptionFailed from '../../MyAccount/components/PlusService/PlusServiceSubscriptionFailed';
import DeeplinkDownloadFailed from '../../MyAccount/components/Deeplink/DeeplinkDownloadFailed';
import RemovePaymentMethodModal from '../../Payment/components/PaymentDisplayEdit/RemovePaymentMethodModal';
import RemovePaymentMethodConfirmationModal
	from '../../Payment/components/PaymentDisplayEdit/RemovePaymentMethodConfirmationModal';
import SocialShareModal from '../../SocialShare/components/SocialShareModal';
import DeactivateGhostOrder from '../../MyAccount/components/PrescriptionAccount/DeactivateGhostOrder';
import DeactivateGhostOrderFailureModal from '../../MyAccount/components/PrescriptionAccount/DeactivateGhostOrderFailureModal';
import UploadConfirmationMoadal from '../../MyAccount/components/Documents/UploadConfirmationMoadal';
import OtpResponseModal from '../../MyAccount/components/CustomerInfo/OtpResponseModal';
import MobileUpdateModal from '../../MyAccount/components/CustomerInfo/MobileUpdateModal';
import VideoModal  from '../../Carousel/components/VideoCarousel/VideoModal';
import InsuranceDisplayEditModal from '../../MyAccount/components/InsuranceDisplayEdit/InsuranceDisplayEditModal';
import ImageModal  from '../../Product/components/ProductImageCarousel/ImageModal';
import ForgetPasswordModal from "../../Authentication/components/Login/ForgetPasswordModal";
import CreateOrderErrorModal from "../../Payment/components/CreateOrderErrorModal.jsx";
import PopupConfirmTechnicalTraining from '../../MyAccount/components/ConfirmTechnicalTraining/PopupConfirmTechnicalTraining';
import DataProcessingConsentModal from '../../Authentication/components/LoginHeader/DataProcessingConsentModal';

const components = {
	addressVerification: AddressVerification,
	deleteOrderAddressConfirmationModal: DeleteOrderAddressConfirmationModal,
	deleteAccountAddressConfirmationModal: DeleteAccountAddressConfirmationModal,
	CouponCodeModal: CouponCodeModal,
	changeDeliveryDateModal: ChangeDeliveryDateModal,
	confirmationPageErrorModal: ConfirmationPageErrorModal,
	confirmationPageLoadingModal: ConfirmationPageLoadingModal,
	registrationErrorModal: RegistrationErrorModal,
	sickFundSearchModal: SickFundSearchModal,
	registrationInProgressModal: RegistrationInProgressModal,
	returnModal: ReturnModal,
	addToCartErrorModal: AddToCartErrorModal,
	generalErrorModal: GeneralErrorModal,
	downloadInvoiceErrorModal: DownloadInvoiceErrorModal,
	changePaymentMethodModal: ChangePaymentMethodModal,
	noPaymentMethodsAvailableModal: NoPaymentMethodsAvailableModal,
	deactivatePlusServiceModal: DeactivatePlusServiceModal,
	deletePlusServiceModal: DeletePlusServiceModal,
	plusServiceUpdatedConfirmationModal: PlusServiceUpdatedConfirmationModal,
	plusServiceSubscriptionFailed: PlusServiceSubscriptionFailed,
	deeplinkDownloadFailed: DeeplinkDownloadFailed,
	removePaymentMethodModal: RemovePaymentMethodModal,
	removePaymentMethodConfirmationModal: RemovePaymentMethodConfirmationModal,
	socialShareModal: SocialShareModal,
	deactivateGhostOrder: DeactivateGhostOrder,
	deactivateGhostOrderFailureModal: DeactivateGhostOrderFailureModal,
	uploadConfirmationMoadal: UploadConfirmationMoadal,
	otpResponseModal: OtpResponseModal,
	mobileUpdateModal:MobileUpdateModal,
	videoModal: VideoModal,
	imageModal: ImageModal,
	insuranceDisplayEditModal: InsuranceDisplayEditModal,
	forgetPasswordModal: ForgetPasswordModal,
	CreateOrderErrorModal: CreateOrderErrorModal,
	popupConfirmTechnicalTraining: PopupConfirmTechnicalTraining,
	dataProcessingConsentModal: DataProcessingConsentModal
};

export const getComponentByTitle = componentTitle => {
	if (components[componentTitle]) {
		return components[componentTitle];
	} else {
		console.warn(`"${componentTitle}" can't be mapped to a React component. Make sure that the component is added to the mapping`);
		return undefined;
	}
};
