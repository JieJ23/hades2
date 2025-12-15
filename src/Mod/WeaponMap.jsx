export const weaponMap = [
    "BaseStaffAspect",
    "StaffClearCastAspect",
    "StaffSelfHitAspect",
    "StaffRaiseDeadAspect",
    "DaggerBackstabAspect",
    "DaggerBlockAspect",
    "DaggerHomingThrowAspect",
    "DaggerTripleAspect",
    "TorchSpecialDurationAspect",
    "TorchDetonateAspect",
    "TorchSprintRecallAspect",
    "TorchAutofireAspect",
    "AxeRecoveryAspect",
    "AxeArmCastAspect",
    "AxePerfectCriticalAspect",
    "AxeRallyAspect",
    "LobAmmoBoostAspect",
    "LobCloseAttackAspect",
    "LobImpulseAspect",
    "LobGunAspect",
    "BaseSuitAspect",
    "SuitHexAspect",
    "SuitMarkCritAspect",
    "SuitComboAspect",
]

export const findWeaponKit = (aspect) => {
    switch (aspect) {
        case "BaseStaffAspect":
        case "StaffClearCastAspect":
        case "StaffSelfHitAspect":
        case "StaffRaiseDeadAspect":
            return "WeaponStaffSwing"
        case "DaggerBackstabAspect":
        case "DaggerBlockAspect":
        case "DaggerHomingThrowAspect":
        case "DaggerTripleAspect":
            return "WeaponDagger"
        case "TorchSpecialDurationAspect":
        case "TorchDetonateAspect":
        case "TorchSprintRecallAspect":
        case "TorchAutofireAspect":
            return "WeaponTorch"
        case "AxeRecoveryAspect":
        case "AxeArmCastAspect":
        case "AxePerfectCriticalAspect":
        case "AxeRallyAspect":
            return "WeaponAxe"
        case "LobAmmoBoostAspect":
        case "LobCloseAttackAspect":
        case "LobImpulseAspect":
        case "LobGunAspect":
            return "WeaponLob"
        case "BaseSuitAspect":
        case "SuitHexAspect":
        case "SuitMarkCritAspect":
        case "SuitComboAspect":
            return "WeaponSuit"
    }
}