import {useSharedLabProfiles} from "../shared/LabProfiles";

const CUSTPORTAL_SELECTED_PROFILE = "custportalSelectedLabProfile";
export const labProfilesService = () => {

    const {selectedLabProfile, setSharedSelectedLabProfile, labProfiles, setSharedLabProfiles} = useSharedLabProfiles();

    const addLabProfile = (customerNumber: string, instrumentSerialNumber: string, isPrimary: string) => {
        window.addLabProfile(customerNumber, instrumentSerialNumber, isPrimary);
        staleLabProfiles();
    }

    const removeLabProfile = (labProfileId: string) => {
        window.removeLabProfile(labProfileId);
        staleLabProfiles();
    }

    const changePrimaryLabProfile = (labProfileId: string) => {
        window.changePrimaryLabProfile(labProfileId);
        staleLabProfiles();
    }

    const staleLabProfiles = () => {
        window.staleLabProfiles();
    }

    const saveSelectedLabProfile = (profile: any) => {
        localStorage?.setItem(CUSTPORTAL_SELECTED_PROFILE, JSON.stringify(profile));
        setSharedSelectedLabProfile(profile);
    }

    const loadSelectedLabProfiles = () => {
        return window.loadSelectedLabProfiles();
    }

    const getSelectedLabProfileFromProfiles = () => {
        let selectedLabProfile = labProfiles?.labProfiles?.find(profile => profile.primary == "true");
        // if there was no selected labprofile in localstorage, save the primary or the first in the lab profiles
        if (labProfiles?.labProfiles.length > 0) {
            selectedLabProfile = selectedLabProfile ?? labProfiles?.labProfiles[0];
            saveSelectedLabProfile(selectedLabProfile);
        }
    }

    const initSelectedLabProfiles = () => {
        const profile = loadSelectedLabProfiles();

        if (!profile) {
            // profile doesn't exist
            getSelectedLabProfileFromProfiles();
        } else {
            setSharedSelectedLabProfile(profile);
        }
    };

    return {
        addLabProfile,
        removeLabProfile,
        changePrimaryLabProfile,
        initSelectedLabProfiles,
        saveSelectedLabProfile
    }
}
