export type TroubleshootingIssue = {
  title: string;
  symptoms: string;
  steps: string[];
  sourceUrl: string;
};

export type TroubleshootingProduct = {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  officialSourceUrl: string;
  officialSourceLabel: string;
  issues: TroubleshootingIssue[];
};

export const TROUBLESHOOTING_CATEGORIES = [
  "Endpoint & OS",
  "Identity & Access",
  "Networking & VPN",
  "Collaboration",
  "Developer & Design Tools",
  "Hardware",
] as const;

export const TROUBLESHOOTING_PRODUCTS: TroubleshootingProduct[] = [
  {
    slug: "windows",
    name: "Windows",
    category: "Endpoint & OS",
    blurb:
      "Microsoft's desktop operating system — startup, update, driver and performance issues.",
    officialSourceUrl:
      "https://learn.microsoft.com/en-us/troubleshoot/windows-client/welcome-windows-client",
    officialSourceLabel: "Microsoft Learn — Windows client troubleshooting",
    issues: [
      {
        title: "Blue Screen (Stop Error / BSOD) Crashes",
        symptoms:
          "The PC halts unexpectedly with a blue error screen and restarts, often tied to a stop code like DRIVER_IRQL_NOT_LESS_OR_EQUAL or PAGE_FAULT_IN_NONPAGED_AREA.",
        steps: [
          "Note the exact stop code shown and check it against known-issue lists for a documented cause.",
          "Install all pending Windows cumulative and driver updates, and update BIOS/firmware to the latest version.",
          "Run built-in hardware and memory diagnostics, and scan for malware.",
          "Confirm at least 10-15% free disk space, since low space can trigger instability.",
          "If a specific driver is named in the error, roll it back, disable it, or get an updated version from the hardware vendor; consider a clean boot to isolate a misbehaving service.",
          "If crashes persist, configure the system to save a memory dump and use WinDbg with Microsoft's public symbol server to identify the faulting driver from the stack trace.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/stop-error-or-blue-screen-error-troubleshooting",
      },
      {
        title: "Slow or Failed Startup",
        symptoms:
          "The machine takes an abnormally long time to boot, hangs during startup, or fails to reach the desktop.",
        steps: [
          "Classify the failure type first — full crash (bug check), boot hang (freeze), or \"no boot\" — since each has a different diagnostic path.",
          "Verify page file and memory-dump settings are configured correctly, as misconfiguration can mask or worsen the issue.",
          "Use System Configuration (msconfig) with Selective Startup to disable services one at a time and isolate which one is delaying boot.",
          "Run the built-in Startup Repair tool to auto-fix common boot corruption.",
          "Capture a boot trace with Windows Performance Analyzer if the slowdown needs deeper analysis.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/windows-startup-issues-troubleshooting",
      },
      {
        title: "Wi-Fi / Wireless Connectivity Problems",
        symptoms:
          "The Wi-Fi adapter is missing, expected networks don't show up, connections fail during authentication, or the device disconnects intermittently.",
        steps: [
          "Match the symptom to a scenario (missing adapter, network not visible, auth failure, intermittent drop, bad roaming) to scope the investigation.",
          "Confirm the WLAN AutoConfig (WlanSvc) service is running and the adapter is enabled in Device Manager.",
          "Collect baseline diagnostics with `netsh wlan show drivers/interfaces/networks/profiles` and generate a wlanreport for session/disconnect history.",
          "Check Event Viewer's WLAN-AutoConfig operational log for the same time window as the failure.",
          "Compare current driver/firmware versions against the adapter vendor's recommended versions, and check for related Windows known issues.",
          "For persistent or complex cases, capture an ETW wireless trace to pinpoint exactly which connection stage (association, authentication, roaming) is failing.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/wireless-network-connectivity-issues-troubleshooting",
      },
      {
        title: "Windows Update Failures",
        symptoms:
          "Updates repeatedly fail to install, get stuck, or the device reports errors like \"the update is not applicable to your computer.\"",
        steps: [
          "Run `Dism /online /cleanup-image /restorehealth` from an elevated prompt to repair the underlying image.",
          "Restart the computer — a pending prior update can block new ones from applying.",
          "Install the latest servicing stack update before retrying the cumulative update.",
          "If the error persists, check whether the update was already superseded, already installed, or mismatched to the device's architecture/edition.",
          "Manually download the exact update package from the Microsoft Update Catalog and install it directly.",
          "For enterprise-managed devices, verify the update ring isn't paused and that the device is properly enrolled and actively scanning the intended update service (not stuck on a stale WSUS endpoint).",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/windows-client/installing-updates-features-roles/troubleshoot-windows-update-issues",
      },
    ],
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365",
    category: "Endpoint & OS",
    blurb:
      "Outlook, Teams, Exchange, OneDrive and SharePoint — sync, profile and connectivity issues.",
    officialSourceUrl:
      "https://learn.microsoft.com/en-us/troubleshoot/microsoft-365-apps/",
    officialSourceLabel: "Microsoft Learn — Microsoft 365 Apps troubleshooting",
    issues: [
      {
        title: "Outlook Mailbox Not Syncing",
        symptoms:
          "Messages, folders, or items differ between Outlook and Outlook on the web, or Outlook throws an error opening the offline data file.",
        steps: [
          "Suspect a corrupted local offline data file (.ost) as the most common root cause.",
          "For a single problem folder, right-click it, choose Properties > Clear Offline Items, then force a folder update from Send/Receive.",
          "If that doesn't help, close Outlook, rename the existing .ost file (e.g., to .old), and relaunch Outlook so it rebuilds a fresh copy from the server.",
          "If the user has local-only data not yet on the server, export it to a .pst first, rebuild the .ost, then reimport using \"do not import duplicates.\"",
          "Confirm firewall/security software isn't blocking Outlook's internet access, and verify basic connectivity in a browser.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/outlook/synchronization/synchronization-issues-occur-in-outlook-owa",
      },
      {
        title: "Microsoft Teams Sign-In Errors",
        symptoms:
          "The user gets an error code or is blocked from signing into Teams, or is stuck in a sign-in loop.",
        steps: [
          "Run the Teams Sign-in diagnostic (or the Remote Connectivity Analyzer test) from the admin center for the affected user.",
          "Confirm the Teams client is fully updated via Settings > Check for updates.",
          "Look up the specific error code shown on the sign-in screen (e.g., 0xCAA82EE7 points to network/connectivity issues; 0xCAA20004 points to a Conditional Access policy blocking sign-in) and apply the matching fix.",
          "If the failure is web-client only, treat it as a browser-specific sign-in loop issue.",
          "As a last resort, uninstall Teams, delete the leftover Teams folder under the user's AppData\\Microsoft path, then reinstall (ideally as administrator).",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/microsoftteams/teams-sign-in/resolve-sign-in-errors",
      },
      {
        title: "Microsoft Teams Fails to Launch or Crashes on Open",
        symptoms:
          "The Teams window flashes open and closes immediately, or won't start at all.",
        steps: [
          "Check whether firewall/proxy rules are blocking the Teams client from reaching required Teams endpoints — this is the most common cause of launch failures.",
          "If the failure is a script error inside the app, have the user sign out and sign back in.",
          "Confirm the device's OS version (Windows or macOS) is still on a supported version for the Teams client.",
          "Review network timeout behavior — allow all required Teams-related network requests through any proxy.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/microsoftteams/teams-administration/resolve-teams-client-launch-failures",
      },
      {
        title: "OneDrive/SharePoint Files Not Syncing",
        symptoms:
          "Files show a stuck sync icon, fail to upload/download, or the OneDrive for work/school client stops syncing a library entirely.",
        steps: [
          "Confirm the OneDrive client is on the current release version before doing anything else.",
          "Check File Explorer for a stalled sync icon — this usually indicates a file conflict; open the file to trigger Office's built-in conflict resolution (save a copy or discard local changes).",
          "Clear cached files from the Microsoft Office Upload Center, which can silently block sync progress.",
          "If many files show errors, stop syncing the library and re-sync it fresh rather than fixing each error individually.",
          "Check for file/folder restrictions (invalid characters, path length, unsupported file types) and rename or move offending items.",
          "Confirm the SharePoint library hasn't been set by an admin to prohibit sync, and re-verify sign-in credentials.",
          "If nothing else works, repair or fully uninstall/reinstall the OneDrive/Office installation.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/sharepoint/sync/troubleshoot-sync-issues",
      },
    ],
  },
  {
    slug: "microsoft-intune",
    name: "Microsoft Intune",
    category: "Endpoint & OS",
    blurb:
      "Cross-platform mobile device management — enrollment, policy and compliance issues.",
    officialSourceUrl:
      "https://learn.microsoft.com/en-us/troubleshoot/mem/intune/welcome-intune",
    officialSourceLabel: "Microsoft Learn — Intune troubleshooting",
    issues: [
      {
        title: "Device Enrollment Failures",
        symptoms:
          "A user's device won't complete enrollment into Intune, often showing an error like \"Company Portal Temporarily Unavailable,\" \"MDM authority not defined,\" or a numeric error code.",
        steps: [
          "Run the platform-specific Intune enrollment diagnostic (Windows, iOS/iPadOS, Android, or macOS) from the Microsoft 365 admin center for the affected user.",
          "Verify the device's date and time are set correctly, then restart it and retry.",
          "If the error references a device cap, check the user's enrolled device count against the configured device limit and remove stale devices if needed.",
          "If it's a Company Portal error, remove and reinstall the Company Portal app, then retry sign-in through a browser first to confirm credentials sync correctly with Entra ID.",
          "Confirm the MDM authority is properly set and the user has the correct Intune license assigned.",
          "Look up any numeric enrollment error code (e.g., proxy issues, pending restart, unsupported OS version) against Microsoft's error code reference table for the specific fix.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-device-enrollment-in-intune",
      },
      {
        title: "Policies or Configuration Profiles Not Applying",
        symptoms:
          "A compliance or configuration policy assigned in Intune never reaches the device, or the device doesn't reflect the expected settings.",
        steps: [
          "Open the Troubleshoot + support pane in the Intune admin center for the affected user and device.",
          "Confirm the device's \"Managed\" status shows MDM (or EAS/MDM) — if not, the device isn't enrolled and can't receive policy.",
          "Check \"Last check-in\" time; if it's over 24 hours old, force a manual device sync (via Company Portal on mobile, or Settings > Accounts > Access Work or School > Info > Sync on Windows).",
          "Review the policy's reported state (Not Applicable, Conflict, Pending, Error) — a Conflict usually means two policies set the same setting differently.",
          "If the expected policy doesn't appear under Device Compliance/Configuration at all, it isn't targeted to that user or device group — reassign it.",
          "Check overall tenant health status for active service incidents that could be delaying policy delivery.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/troubleshoot-policies-in-microsoft-intune",
      },
      {
        title: "Device Shows Incorrect or Stuck Compliance Status",
        symptoms:
          "A device that meets all configured requirements is still marked \"Not Compliant\" in Intune (a common example: firewall is on, but the device shows noncompliant anyway).",
        steps: [
          "Confirm which specific compliance setting is reported as failing in the admin center.",
          "Check if the issue matches a known OS-version bug (e.g., older Windows 10 builds misreport firewall compliance) and install the vendor-recommended cumulative update.",
          "If a fix isn't available yet, use a temporary workaround: add a grace period (\"Mark device noncompliant\" with a nonzero day delay) or temporarily set the offending setting to \"Not configured.\"",
          "Have the affected user manually sync their device, then verify compliance status again in the company portal.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-protection/win10-devices-show-incorrect-compliance-status",
      },
      {
        title: "App Installation Failures",
        symptoms:
          "An app assigned through Intune fails to install on a user's device, or shows as stuck/failed in the Company Portal.",
        steps: [
          "Run the Intune app deployment self-help diagnostic for the affected user.",
          "In the admin center, open Troubleshoot + support for the user, select the device, then check Managed Apps for the specific failing app's installation status and details.",
          "Look up the exact error code returned against Intune's app installation error code reference for the platform (Android/iOS/Win32).",
          "If the app doesn't appear at all in Company Portal, confirm it's deployed with \"Available\" intent and targeted to the correct device/user group.",
          "Check whether the user has exceeded their Entra ID device limit, which can silently block new app delivery.",
          "For a required app that failed once, sync the device again to retry the install automatically.",
        ],
        sourceUrl:
          "https://learn.microsoft.com/en-us/troubleshoot/mem/intune/app-management/troubleshoot-app-install",
      },
    ],
  },
  {
    slug: "apple",
    name: "Apple",
    category: "Endpoint & OS",
    blurb:
      "macOS, iPhone and iPad — Wi-Fi, Bluetooth, app and printer issues.",
    officialSourceUrl: "https://support.apple.com/",
    officialSourceLabel: "Apple Support",
    issues: [
      {
        title: "Wi-Fi Won't Connect on iPhone/iPad",
        symptoms:
          "The device can't join a wireless network, shows no networks, or connects but has no internet access.",
        steps: [
          "Confirm Wi-Fi is toggled on in Settings and Airplane Mode is off; try joining the network again.",
          "If the Wi-Fi toggle is greyed out, restart the device.",
          "Remove any recently installed VPN or security apps, restart, and retest — third-party VPN/security software is a common blocker.",
          "Determine if the problem is specific to one network (check the router/other devices) or affects every network (points to a device-side issue).",
          "Restart the router and modem by power-cycling them.",
          "As a last resort, reset network settings (Settings > General > Transfer or Reset > Reset Network Settings), which clears all saved Wi-Fi networks, passwords, and VPN/APN settings.",
        ],
        sourceUrl: "https://support.apple.com/en-us/111786",
      },
      {
        title: "Bluetooth Accessory Won't Connect",
        symptoms:
          "A Bluetooth accessory (keyboard, headphones, mouse, etc.) fails to pair or connect to an iPhone or iPad.",
        steps: [
          "Make sure the accessory is powered on, charged, and within range, and put it into discovery/pairing mode per its manual.",
          "If it was previously paired, unpair it first, then put it back into discovery mode and pair again.",
          "Power-cycle the accessory itself.",
          "If it connects fine to other devices but not this one, unpair it from those other devices first, then retry pairing.",
          "Confirm with the accessory manufacturer that it's compatible with the device's OS version.",
          "If Bluetooth won't toggle on at all, or nothing above resolves it, escalate to Apple Support.",
        ],
        sourceUrl: "https://support.apple.com/en-us/111804",
      },
      {
        title: "Device Storage Full",
        symptoms:
          "The device shows a \"storage almost full\" or similar low-space alert and can't install updates, take photos, or download new content.",
        steps: [
          "Check current usage under Settings > General > iPhone/iPad Storage to see the breakdown by category.",
          "Review and apply Apple's built-in optimization recommendations (e.g., offload unused apps automatically, optimize photo storage).",
          "Offload (not delete) large unused apps to reclaim space while preserving their documents/data.",
          "Manually clear out large media, old Messages attachments, and downloaded offline video content no longer needed.",
          "Connect the device to a computer to confirm the storage bar reflects the freed-up space.",
        ],
        sourceUrl: "https://support.apple.com/en-us/108429",
      },
      {
        title: "App Freezes or Crashes on Mac",
        symptoms:
          "An application on macOS becomes unresponsive or quits unexpectedly.",
        steps: [
          "Force quit the app via Apple menu > Force Quit (select the app, click Force Quit).",
          "Reopen the app; if prompted, try again with a different file, since the original file may be the actual problem.",
          "Restart the Mac entirely if the issue recurs immediately.",
          "Confirm the app is compatible with the installed macOS version, and check for pending app/macOS updates.",
          "Disconnect any recently added peripherals (printers, external drives) that could be conflicting.",
          "Remove any third-party plug-ins or enhancements for the app, especially after a recent update.",
          "Run Apple Diagnostics to rule out a hardware problem (e.g., improperly seated memory) if crashes continue across apps.",
        ],
        sourceUrl:
          "https://support.apple.com/guide/mac-help/if-an-app-freezes-or-quits-unexpectedly-mchlp2579/mac",
      },
    ],
  },
  {
    slug: "google-workspace",
    name: "Google Workspace",
    category: "Endpoint & OS",
    blurb: "Gmail, Drive and the Admin console — sync, storage and login issues.",
    officialSourceUrl: "https://support.google.com/a/",
    officialSourceLabel: "Google Workspace Admin Help",
    issues: [
      {
        title: "Gmail Not Syncing (Mobile/App)",
        symptoms:
          "New mail doesn't arrive, inbox appears stale, or the Gmail app shows an \"Account not synced\" error.",
        steps: [
          "Manually refresh by pulling down on the inbox and wait up to 15 minutes for sync to complete.",
          "Confirm the device has a working internet connection by loading a website in the browser.",
          "Update the Gmail app to the latest version from the app store.",
          "In Gmail settings, check that \"Sync Gmail\" is enabled for the account, and that device-level account sync is turned on.",
          "Free up mailbox space by deleting large attachments and emptying Trash/Spam, since a full mailbox blocks sync.",
          "Restart the device, and as a last resort clear the Gmail app's storage/cache (this wipes local drafts and settings).",
        ],
        sourceUrl: "https://support.google.com/mail/answer/6383854?hl=en",
      },
      {
        title: "Mailbox/Drive Storage Full",
        symptoms:
          "User can't send or receive mail, or upload to Drive, because their shared Google storage quota is full.",
        steps: [
          "Empty the Gmail Trash and Spam folders and the Drive Trash — these still count against quota until permanently cleared.",
          "Search Gmail for large messages using an operator like \"has:attachment larger:10M\" and delete unneeded ones.",
          "In Drive, open the storage management view to sort files by size and remove large or duplicate files.",
          "Delete unnecessary device backups and hidden app data tied to Drive.",
          "Allow 48–72 hours for the storage total to refresh after a bulk deletion.",
          "If space is still short, purchase additional storage via Google One (or a Workspace storage upgrade).",
        ],
        sourceUrl: "https://support.google.com/mail/answer/6374270?hl=en",
      },
      {
        title: "Legitimate Email Wrongly Marked as Spam",
        symptoms:
          "Expected emails from a known sender land in the Spam folder instead of the inbox.",
        steps: [
          "Open the Spam folder, select the misfiled message, and mark it \"Not spam.\"",
          "Add the sender to Google Contacts so future messages from them aren't filtered.",
          "Search for the sender's address in the Gmail search bar and create a filter with \"Never send it to Spam\" selected.",
          "For domain-wide patterns, a Workspace admin can add custom spam filter rules in the Admin console using address lists.",
        ],
        sourceUrl: "https://support.google.com/mail/answer/16457426?hl=en",
      },
      {
        title: "Can't Sign In Due to 2-Step Verification",
        symptoms:
          "User is locked out of their account because they can't complete the second verification step (lost phone, no code received, etc.).",
        steps: [
          "If the phone was lost or stolen, sign that device out remotely and change the account password immediately.",
          "Try an alternate verification method: another signed-in device, a backup phone number, a saved backup code, a security key, or a passkey on another device.",
          "Try signing in from a device previously marked as trusted, which may skip the second step.",
          "If a verification code never arrives, check for a Google Prompt instead, confirm the device has network access, and remember only the most recently sent code is valid.",
          "If a security key or passkey is unavailable, remove it from account settings using another verified method and register a replacement.",
          "If all methods are exhausted, start Google's account recovery process (can take several business days).",
        ],
        sourceUrl: "https://support.google.com/accounts/answer/185834?hl=en",
      },
    ],
  },
  {
    slug: "chrome",
    name: "Google Chrome",
    category: "Endpoint & OS",
    blurb: "The Chrome browser — crashes, performance and sync issues.",
    officialSourceUrl: "https://support.google.com/chrome/",
    officialSourceLabel: "Google Chrome Help",
    issues: [
      {
        title: "Chrome Crashes or Won't Open",
        symptoms: "Chrome closes unexpectedly, freezes, or fails to launch at all.",
        steps: [
          "Close unused tabs and other running applications to free up memory, then reload the page.",
          "Fully quit Chrome and reopen it; if that fails, restart the computer.",
          "Disable hardware acceleration under Settings > System, then relaunch Chrome.",
          "Remove all extensions and re-add them one at a time to isolate a faulty one.",
          "Scan the system for malware that could be interfering with the browser.",
          "If nothing else works, uninstall Chrome (clearing its data) and reinstall a fresh copy.",
        ],
        sourceUrl:
          "https://support.google.com/chrome/answer/142063?hl=en&co=GENIE.Platform%3DDesktop",
      },
      {
        title: "Chrome Running Slow",
        symptoms: "Pages load sluggishly, tabs lag, or the browser feels unresponsive.",
        steps: [
          "Update Chrome to the latest version.",
          "Close tabs that aren't in active use — more open tabs means more memory pressure.",
          "Disable extensions that aren't needed, since poorly coded extensions are a common cause of slowdowns.",
          "Open Task Manager (via the Chrome menu) to spot and end resource-heavy tabs or processes.",
          "On older/slower devices, turn on Memory Saver under Settings > Performance and switch to the default theme.",
          "As a deeper fix, reset Chrome settings back to default.",
        ],
        sourceUrl:
          "https://support.google.com/chrome/answer/1385029?hl=en&co=GENIE.Platform%3DDesktop",
      },
      {
        title: "A Specific Extension Breaks Pages or the Browser",
        symptoms:
          "Pages fail to load correctly, throw connection errors, or Chrome misbehaves only when a particular extension is active.",
        steps: [
          "Go to chrome://extensions and disable extensions one by one to identify the culprit.",
          "If an extension shows a \"corrupted\" warning, use the Repair option on the extensions page.",
          "For connection/loading errors specifically, try disabling extensions as a first troubleshooting step before other fixes.",
          "Once the problem extension is found, remove it, or check for an update from its developer.",
          "If crashes persist, uninstall all extensions and re-add them individually to confirm the fix.",
        ],
        sourceUrl:
          "https://support.google.com/chrome/answer/142063?hl=en&co=GENIE.Platform%3DDesktop",
      },
      {
        title: "Chrome Sync Not Working",
        symptoms:
          "Bookmarks, passwords, or settings stop syncing across devices, or Chrome shows a \"sync paused\" state.",
        steps: [
          "If sync is paused after signing out of a Google service, click \"Verify it's you\" in the top-right corner and sign back in.",
          "If sync keeps turning off every time Chrome closes, go to Settings > Privacy and security > Site Settings > Additional content settings > On-device site data, and allow sites to save data on the device.",
          "Confirm the correct Google account is signed in and sync is toggled on in Chrome settings.",
          "Restart Chrome after re-authenticating to confirm sync resumes.",
        ],
        sourceUrl: "https://support.google.com/chrome/answer/9175737?hl=en",
      },
    ],
  },
  {
    slug: "android",
    name: "Android",
    category: "Endpoint & OS",
    blurb:
      "Android mobile OS, including managed/enterprise devices — connectivity and app issues.",
    officialSourceUrl: "https://support.google.com/android/",
    officialSourceLabel: "Android Help",
    issues: [
      {
        title: "Wi-Fi or Mobile Data Won't Connect",
        symptoms:
          "Device shows no internet access or repeatedly fails to connect to a wireless or mobile network.",
        steps: [
          "Restart the device — this resolves many temporary connection issues.",
          "Toggle Airplane Mode on, wait about 10 seconds, then turn it back off to reset radios.",
          "For Wi-Fi, confirm it's enabled in Settings, move closer to the router if signal is weak, and restart the router (unplug 30 seconds, plug back in).",
          "For mobile data, toggle it off and on in Settings and confirm a signal indicator (2G/3G/4G/H) is present; if absent, the device may be out of coverage.",
          "Switch between Wi-Fi and mobile data to isolate which connection type is failing.",
          "If the problem persists, contact the mobile carrier or device manufacturer.",
        ],
        sourceUrl: "https://support.google.com/android/answer/2651367?hl=en",
      },
      {
        title: "App Crashes or Won't Respond",
        symptoms: "An installed app force-closes, freezes, or won't open at all.",
        steps: [
          "Force-restart the phone by holding the Power button until it reboots.",
          "Check for and install any pending Android system update, and update the app itself via the Play Store.",
          "Force stop the app from Settings, then clear its cache; if that doesn't help, clear its stored data (this erases app-local data).",
          "Toggle the device's automatic date & time setting off and back on to fix sync-related app errors.",
          "Uninstall and reinstall the app if the issue continues (this erases any data saved only in the app).",
          "If only one app is affected, contact that app's developer; if it fails to update at all, contact Google Play support.",
        ],
        sourceUrl: "https://support.google.com/android/answer/2668665?hl=en",
      },
      {
        title: "Device Storage Full",
        symptoms:
          "Device warns storage is full, can't install updates or new apps, or performance degrades.",
        steps: [
          "Go to Settings > Storage > Free up space to see and remove suggested large or unused files.",
          "Delete local copies of photos/videos already backed up in Google Photos.",
          "Uninstall unused apps via the Play Store, or clear individual apps' cache and stored data.",
          "Turn on \"Automatically archive apps\" in Play Store settings to free space from rarely-used apps while keeping their data.",
          "Enable Smart Storage (Settings > Storage > Free up space > Settings) to auto-delete already-backed-up media when space runs low.",
          "Move remaining files to a computer via USB and delete the local copies.",
        ],
        sourceUrl: "https://support.google.com/android/answer/7431795?hl=en",
      },
      {
        title: "Work Profile / Managed App Install Failures on Enterprise Devices",
        symptoms:
          "A managed (work profile) Android device can't install apps from Managed Google Play, shows \"no apps to install,\" or blocks required app updates.",
        steps: [
          "If the Managed Google Play store appears empty, clear its cache via Settings > Apps > Work Profile > Managed Google Play Store > Clear Data, then reopen it; newly granted access can also take a few hours to appear.",
          "For install failures, verify the device is connected to the correct network — some private/internal apps require the corporate network specifically.",
          "If installation fails due to \"no license,\" ask the IT administrator to purchase or assign additional app licenses.",
          "Confirm with the administrator that the app has actually been made visible/assigned to the user or device group.",
          "For large app updates (over 150MB) blocked on mobile data, either confirm the update manually or ask the admin to enable auto-updates over cellular.",
          "If a pre-installed or work-assigned app can't be uninstalled, this is expected policy enforcement — contact the administrator to remove it.",
        ],
        sourceUrl: "https://support.google.com/work/android/answer/6190595?hl=en-GB",
      },
    ],
  },
  {
    slug: "ubuntu",
    name: "Ubuntu",
    category: "Endpoint & OS",
    blurb: "Ubuntu Linux desktop and server — package, network and boot issues.",
    officialSourceUrl: "https://help.ubuntu.com/",
    officialSourceLabel: "Official Ubuntu Documentation",
    issues: [
      {
        title: "Broken Package Manager / apt Errors",
        symptoms:
          "apt or dpkg fails with lock errors, broken dependencies, or won't complete installs/updates.",
        steps: [
          "Close any other open package management tools (Software Center, Update Manager, Synaptic) before troubleshooting.",
          "Disable third-party PPA repositories temporarily, keeping only the official Ubuntu repos enabled, since misbehaving PPAs are a common cause.",
          "Remove stale lock files (apt lists lock, apt cache archives lock, dpkg lock) if a previous operation was interrupted.",
          "Run \"sudo dpkg --configure -a\" to finish any partially configured packages, then \"sudo apt-get -f install\" to fix broken dependencies.",
          "Clear the local package cache with \"sudo apt-get clean\" and \"sudo apt-get autoclean,\" then refresh with \"sudo apt-get update.\"",
          "Finish with \"sudo apt-get dist-upgrade\" to bring the system fully up to date once the manager is stable.",
        ],
        sourceUrl:
          "https://help.ubuntu.com/community/PackageManagerTroubleshootingProcedure",
      },
      {
        title: "Wi-Fi Won't Connect",
        symptoms:
          "The wireless adapter isn't detected, won't associate with a network, or drops connections repeatedly.",
        steps: [
          "Run the built-in wireless troubleshooter, which walks through an initial check of the connection.",
          "Have it gather and review information about the wireless hardware to confirm it's recognized by the system.",
          "Verify the hardware itself is working and not disabled (e.g., a hardware Wi-Fi switch or blocked radio).",
          "Attempt to create a fresh connection to the router through the troubleshooter.",
          "Check the modem/router itself as a possible source of the problem (restart it, check its status lights).",
          "Use terminal diagnostics like \"lshw -C network\" to confirm adapter detection and \"ping\" to isolate where connectivity breaks down.",
        ],
        sourceUrl:
          "https://help.ubuntu.com/stable/ubuntu-help/net-wireless-troubleshooting.html.en",
      },
      {
        title: "System Won't Boot (GRUB Failure)",
        symptoms:
          "The machine stops at a \"grub>\" or \"grub rescue>\" prompt, shows a bare \"GRUB\" with no menu, or freezes at the splash screen instead of booting normally.",
        steps: [
          "Identify the failure type by which prompt appears: \"grub>\" means a missing/corrupt config file; \"grub rescue>\" means GRUB can't find its own folder or modules; a bare \"GRUB\" text means the boot record itself is damaged.",
          "At a \"grub>\" prompt, try loading the config directly with \"configfile /boot/grub/grub.cfg\"; if that's missing, manually point GRUB at the root partition, kernel, and initrd images and boot.",
          "At a \"grub rescue>\" prompt, manually set the prefix and root partition, load the normal/linux modules, then point to the kernel and initrd files to boot.",
          "Once booted successfully, make the fix permanent by running \"sudo update-grub\" and \"sudo grub-install\" against the whole disk device (not a partition).",
          "If manual recovery is too complex, boot a live USB and run the Boot-Repair tool for automated diagnosis and repair.",
          "Use the \"ls\" command inside the GRUB shell to list drives/partitions if unsure which one holds the boot files.",
        ],
        sourceUrl: "https://help.ubuntu.com/community/Grub2/Troubleshooting",
      },
      {
        title: "Display/Graphics Driver Problems",
        symptoms:
          "Screen looks fuzzy or pixelated, resolution is wrong, or the display misbehaves after a driver install.",
        steps: [
          "If the screen looks blurry, open Activities > Displays and try different resolution options until the image looks sharp — the wrong resolution is the most common cause.",
          "When using two monitors, prefer \"Join Displays\" over \"Mirror\" so each screen can run its own native resolution instead of a shared, less-sharp one.",
          "To fix a missing or malfunctioning graphics driver, use the built-in Additional Drivers manager, or run \"sudo ubuntu-drivers devices\" from a terminal to list available drivers.",
          "Identify the graphics hardware first with \"lspci | grep VGA\" or \"sudo lshw -C video\" to make sure the right driver is chosen.",
          "If a driver install breaks the display entirely, boot into GRUB's recovery mode, drop to a root shell, and uninstall the problematic driver.",
          "As a fallback, run \"sudo dpkg-reconfigure -phigh xserver-xorg\" to restore default display settings.",
        ],
        sourceUrl: "https://help.ubuntu.com/stable/ubuntu-help/look-display-fuzzy.html.en",
      },
    ],
  },
  {
    slug: "red-hat",
    name: "Red Hat",
    category: "Endpoint & OS",
    blurb: "Red Hat Enterprise Linux — package, network and system issues.",
    officialSourceUrl: "https://docs.redhat.com/en",
    officialSourceLabel: "Red Hat Documentation",
    issues: [
      {
        title: "Package Install/Update Problems with DNF",
        symptoms:
          "A dnf install or update either fails partway through or leaves the system in an unexpected state.",
        steps: [
          "Use \"dnf history\" to review the timeline of recent transactions and find the transaction ID responsible for the problem.",
          "To revert just the problematic transaction, run \"dnf history undo <transaction_id>\" — it reinstalls anything that was removed and removes anything that was installed by that transaction.",
          "To revert everything back through several transactions, use \"dnf history rollback <transaction_id>\" instead.",
          "Avoid using undo/rollback to downgrade core system packages like the kernel, glibc, or selinux packages — Red Hat explicitly does not support downgrading these this way.",
          "After reverting, re-run the original install/update to confirm whether the issue reproduces, which helps isolate whether it's a repo/dependency problem versus a one-off failure.",
        ],
        sourceUrl:
          "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_software_with_the_dnf_tool/assembly_handling-package-management-history_managing-software-with-the-dnf-tool",
      },
      {
        title: "Network Connection Not Coming Up",
        symptoms:
          "A configured network connection doesn't activate automatically (e.g., after reboot) or fails silently, even though the configuration looks correct.",
        steps: [
          "Check NetworkManager's status and recent activity with \"journalctl -u NetworkManager -b\".",
          "If more detail is needed, raise the log level temporarily with \"nmcli general logging level <level> domains <domain-list>\" (e.g., PLATFORM, DHCP4, IP4) rather than jumping straight to full TRACE.",
          "For a deeper capture, enable debug-level logging via a drop-in file at /etc/NetworkManager/conf.d/95-nm-debug.conf and restart NetworkManager.",
          "If logs are getting dropped due to volume, raise the journald rate limit (RateLimitBurst=0 in journald.conf) and restart systemd-journald first.",
          "Review the resulting logs for the specific point where the connection attempt fails (DHCP, IP assignment, link state, etc.) and address that layer specifically.",
        ],
        sourceUrl:
          "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/network_troubleshooting_and_performance_tuning/introduction-to-networkmanager-debugging",
      },
      {
        title: "SELinux Blocking Access to a Service or File",
        symptoms:
          "An application or service unexpectedly fails to start or access a resource, with no obvious permissions issue outside of SELinux.",
        steps: [
          "Check the audit log for a denial using \"ausearch -m AVC,USER_AVC,SELINUX_ERR,USER_SELINUX_ERR -ts recent\".",
          "If nothing shows up, confirm the audit daemon (auditd) is running, then reproduce the issue and check again; if auditd isn't running, check \"dmesg\" for SELinux-related messages instead.",
          "To confirm SELinux is actually the cause, temporarily switch to permissive mode with \"setenforce 0\" and retry — if the problem goes away, SELinux was blocking it.",
          "For mislabeled files, set the correct file context with \"semanage fcontext\" and apply it with \"restorecon\".",
          "For a service that legitimately needs an exception, enable the relevant SELinux boolean with \"setsebool -P\" rather than disabling SELinux entirely.",
          "Only as a last resort, use \"audit2allow\" to generate a custom policy module after ruling out mislabeling and boolean-based fixes.",
        ],
        sourceUrl:
          "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_selinux/troubleshooting-problems-related-to-selinux_using-selinux",
      },
      {
        title: "System Won't Boot (Boot Loader/Kernel Issue)",
        symptoms:
          "The system fails to boot normally, commonly because the GRUB2 boot loader was corrupted, deleted, or overwritten by another OS installer.",
        steps: [
          "Boot from RHEL installation/rescue media and choose \"Rescue a Red Hat Enterprise Linux system\" from the Troubleshooting submenu (or add inst.rescue to the boot line).",
          "If a driver is needed to see the disks, add inst.dd=<driver_name> to the boot line; if a driver is actually causing the failure, blacklist it instead with modprobe.blacklist=<driver_name>.",
          "When prompted, mount the existing installation in read-write mode so it can be repaired.",
          "From the rescue shell, chroot into the mounted system and reinstall/repair the GRUB2 boot loader to the disk's boot record.",
          "Exit rescue mode and reboot normally to confirm the fix; if the system still won't boot, try selecting an older kernel entry from the GRUB menu as a fallback while further diagnosing the newer kernel.",
        ],
        sourceUrl:
          "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/installation_guide/sect-rescue-mode",
      },
    ],
  },
  {
    slug: "okta",
    name: "Okta",
    category: "Identity & Access",
    blurb: "Single sign-on and identity provider — MFA, SSO and provisioning issues.",
    officialSourceUrl: "https://help.okta.com/en-us/content/index.htm",
    officialSourceLabel: "Okta Documentation",
    issues: [
      {
        title: "MFA / Okta Verify Push Notification Not Received",
        symptoms:
          "The user attempts to sign in but never receives the Okta Verify push prompt on their phone, or it arrives with a long delay.",
        steps: [
          "Confirm the device's date/time is set to automatic/network time rather than manual.",
          "Check for duplicate Okta Verify installations across a work profile and personal profile, and keep it installed in only one.",
          "On Android, make sure background data usage is enabled for the Okta Verify app.",
          "Test connectivity by opening the org's Okta sign-in URL directly in the phone's browser; restart network settings if that fails.",
          "Reboot the device, and confirm it isn't jailbroken or running security software that could block notifications.",
          "Disable any active VPN connection on the phone, since certain VPN policies block the TCP traffic push notifications rely on.",
        ],
        sourceUrl:
          "https://support.okta.com/help/s/article/Okta-Verify-Push-Authentication-Issue?language=en_US",
      },
      {
        title: "SSO Redirect Loop / Infinite Loop After Login",
        symptoms:
          "After entering credentials, the browser bounces repeatedly between Okta URLs instead of landing on the app.",
        steps: [
          "Set the device's date/time to sync automatically.",
          "Clear the browser's cache and cookies, then navigate directly to the org's base Okta URL instead of an old bookmark or deep link.",
          "Add the Okta domain to the browser's or security software's trusted sites list.",
          "Enable third-party cookies in the browser, since blocking them can break the authentication callback.",
          "Temporarily disable browser extensions (ad blockers, privacy tools) that may interfere with network requests.",
          "If the loop persists, capture a HAR file of the login attempt and escalate to Okta support with it attached.",
        ],
        sourceUrl:
          "https://support.okta.com/help/s/article/Users-Experiencing-Infinite-Loop-When-Accessing-the-Okta-Dashboard?language=en_US",
      },
      {
        title: "Account Locked Out",
        symptoms:
          "The user is told their account is locked, usually after repeated failed sign-in attempts, and can't sign in even with the correct password.",
        steps: [
          "From the sign-in page, have the user click \"Unlock account?\" (or \"Need help signing in?\").",
          "Enter the username and proceed to identity verification.",
          "Verify identity using an enrolled method such as email or security questions.",
          "Choose to receive an unlock link by email and click \"Unlock Account\" in that email.",
          "Complete any additional MFA verification the org requires, sign in, and confirm the success message.",
          "If self-service fails, escalate to an Okta admin to unlock manually via Directory > People > More Actions > Unlock Account.",
        ],
        sourceUrl:
          "https://support.okta.com/help/s/article/Okta-Self-Service-Account-Unlock-Process?language=en_US",
      },
      {
        title: "Self-Service Password Reset Not Working",
        symptoms:
          "The user tries \"Forgot password\" but gets an error saying only an administrator can reset it, or the reset option isn't available at all.",
        steps: [
          "Check whether the account is actually locked — this specific error commonly appears for locked accounts, not just forgotten passwords.",
          "Have the user try \"Need help signing in?\" > \"Unlock account?\" on the sign-in page instead of the password-reset flow.",
          "If self-service unlock isn't offered, an admin should unlock the account from Directory > People > select user > More Actions > Unlock Account.",
          "If self-service password reset is entirely unavailable, an admin should confirm a self-service recovery option is enabled in the applicable authentication policy.",
          "For AD-mastered accounts, verify the Okta AD Agent service account has permission to reset passwords in Active Directory, and restart the AD agent after any permission change.",
          "Check password policy settings (minimum password age, history) that could silently block a reset even when the flow appears to work.",
        ],
        sourceUrl:
          "https://support.okta.com/help/s/article/Users-unable-to-self-serve-on-password-resets?language=en_US",
      },
    ],
  },
  {
    slug: "cisco-secure-client",
    name: "Cisco Secure Client",
    category: "Networking & VPN",
    blurb: "Enterprise VPN client — connection, authentication and performance issues.",
    officialSourceUrl: "https://www.cisco.com/c/en/us/support/index.html",
    officialSourceLabel: "Cisco Support",
    issues: [
      {
        title: "VPN Disconnects or Drops Repeatedly",
        symptoms:
          "The VPN tunnel connects successfully but drops unexpectedly or cycles between connected/disconnected states.",
        steps: [
          "Immediately after a drop, generate a DART (Diagnostic AnyConnect Reporting Tool) log bundle for analysis.",
          "Confirm TCP 443 and UDP 443 (for DTLS) are not being blocked between the client and the VPN headend.",
          "Check the DART logs for Dead Peer Detection failures (look for a DPD \"no response\" error).",
          "If DPD failures are found, have the admin tune keepalive/DPD intervals on the VPN gateway.",
          "As a test, temporarily disable DTLS to see if forcing TLS-only stabilizes the session.",
          "Ensure Remote Desktop/Fast User Switching isn't active, since multiple simultaneous local sessions aren't supported.",
        ],
        sourceUrl:
          "https://www.cisco.com/c/en/us/support/docs/security/asa-5500-x-series-firewalls/212972-anyconnect-vpn-client-troubleshooting-gu.html",
      },
      {
        title: "Can't Connect / Authentication Fails",
        symptoms:
          "The client fails to establish a session, returns a login-denied error, or reports a licensing/certificate problem during authentication.",
        steps: [
          "Verify the connection profile's group policy and tunnel-group match what's configured on the headend.",
          "Confirm the authentication method the client is using (RADIUS, SAML, or certificate) matches what the gateway expects.",
          "If certificate auth is used, check that the server's certificate FQDN matches the entry in the client profile's server list.",
          "If the client reports the client software isn't enabled, have the admin verify Secure Client images are deployed on the headend.",
          "Check for \"no license\" errors, which indicate missing Secure Client mobility licenses on the gateway.",
          "Verify the IP address pool used for VPN clients is correctly configured on the gateway.",
        ],
        sourceUrl:
          "https://www.cisco.com/c/en/us/support/docs/security/asa-5500-x-series-firewalls/212972-anyconnect-vpn-client-troubleshooting-gu.html",
      },
      {
        title: "Slow VPN Performance",
        symptoms:
          "Applications and file transfers are noticeably sluggish once connected over VPN, even though the tunnel itself is stable.",
        steps: [
          "Run a scaling ping test (e.g., increasing packet sizes) to a known host to check for fragmentation issues.",
          "If fragmentation is found, lower the client MTU (commonly to around 1200) via the group policy.",
          "Disable VPN compression if large packets are being sent, since compression can add overhead.",
          "Capture ipconfig/route information and a packet capture before/after connecting to compare network behavior.",
          "Use the client's built-in Statistics view (gear icon > Advanced Window > Statistics) to export session stats and look for clues.",
          "Check for known third-party software conflicts (certain antivirus SSL scanning features or Winsock LSP modules) that are documented to cause throughput drops.",
        ],
        sourceUrl:
          "https://www.cisco.com/c/en/us/support/docs/security/asa-5500-x-series-firewalls/212972-anyconnect-vpn-client-troubleshooting-gu.html",
      },
      {
        title: "DNS Not Resolving Over VPN",
        symptoms:
          "Internal hostnames fail to resolve (or public sites stop resolving) once the VPN tunnel is up, especially with split tunneling enabled.",
        steps: [
          "Determine whether split tunneling and split-DNS are configured — behavior differs significantly depending on this.",
          "With split-include tunneling and no split-DNS/tunnel-all-DNS configured, expect the client to try the corporate DNS server over the tunnel first, then fall back to the local/public DNS server if it gets no answer.",
          "Confirm the corporate DNS server's subnet is included in the split-include access list — recent client versions auto-add a host route for the DNS server, but older configs may need this added manually.",
          "If internal names still fail, verify the DNS server itself is reachable through the tunnel (not just routed).",
          "Review the adapter/interface metric ordering, since the VPN adapter is expected to be preferred for DNS while connected.",
        ],
        sourceUrl:
          "https://www.cisco.com/c/en/us/support/docs/security/anyconnect-secure-mobility-client/116016-technote-AnyConnect-00.html",
      },
    ],
  },
  {
    slug: "zoom",
    name: "Zoom",
    category: "Collaboration",
    blurb: "Video conferencing — audio, video and meeting connectivity issues.",
    officialSourceUrl: "https://support.zoom.com/hc/en",
    officialSourceLabel: "Zoom Help Center",
    issues: [
      {
        title: "Audio/Microphone Not Working",
        symptoms:
          "Other participants can't hear the user, or the user can't hear any sound during a Zoom call.",
        steps: [
          "Check the physical connection — reseat the mic cable, or reconnect/re-pair a Bluetooth device.",
          "Confirm the mic isn't muted in Zoom and check for a hardware mute switch on the headset/mic itself.",
          "In Zoom Settings > Audio, run the speaker and microphone tests and select the correct devices from the dropdowns, adjusting volume as needed.",
          "On Windows, try disabling \"Signal processing by Windows audio device drivers\" under advanced audio settings.",
          "Check OS-level privacy settings to confirm both general and desktop-app microphone access is allowed.",
          "Increase system volume and confirm the correct output device is selected outside of Zoom as well.",
        ],
        sourceUrl:
          "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060836",
      },
      {
        title: "Video/Camera Not Working",
        symptoms:
          "The user's video doesn't appear during a meeting, or Zoom reports it can't detect a camera.",
        steps: [
          "During the meeting, open the Start/Stop Video arrow > Video Settings and try switching to a different camera in the dropdown if more than one is available.",
          "Verify OS or security software isn't blocking Zoom's camera access, and grant camera permission to Zoom if needed.",
          "Test the camera using Zoom's built-in video test before rejoining.",
          "If the issue persists, fully uninstall Zoom, download the latest version from the Zoom Download Center, and reinstall.",
          "Confirm no other application is currently using the camera exclusively.",
        ],
        sourceUrl:
          "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068908",
      },
      {
        title: "Can't Join a Meeting",
        symptoms:
          "The user gets an invalid meeting ID error, is prompted for a passcode they don't have, or the meeting link simply won't open.",
        steps: [
          "Skip the broken link and join manually by opening the Zoom app and entering the meeting ID/passcode directly; contact the host if those aren't known.",
          "Try joining from a different browser if the web/browser join path is failing.",
          "If joining via browser fails, install (or reinstall) the Zoom desktop app and try again.",
          "If Zoom is already installed and still failing, fully uninstall it (using Zoom's clean-uninstall tool if needed) and reinstall the latest version.",
          "If the meeting ID is reported invalid, confirm with the host that the ID hasn't changed — this happens with recurring meetings — especially if only some participants are affected.",
        ],
        sourceUrl:
          "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068749",
      },
      {
        title: "Screen Share Not Working",
        symptoms:
          "The Share Screen option is greyed out, missing, or screen sharing stops working once other participants join.",
        steps: [
          "If the sharing option is greyed out for a host, check whether screen sharing has been locked at the group or account level and escalate to a Zoom admin if so.",
          "Check the \"Disable screen sharing when guests are in the meeting\" setting if sharing stops as soon as guests join.",
          "Verify participant-level screen-share permissions are enabled if a non-host can't see the option.",
          "Update the Zoom app to the latest version, then clear the app's cache/cookies and restart the device or refresh the browser.",
          "On macOS 10.15+, confirm Zoom has been granted Screen Recording permission in System Settings > Privacy & Security.",
          "As a last resort, uninstall and reinstall Zoom.",
        ],
        sourceUrl:
          "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0058730",
      },
    ],
  },
  {
    slug: "jetbrains",
    name: "JetBrains",
    category: "Developer & Design Tools",
    blurb: "IntelliJ-platform IDEs — license activation and provisioning issues.",
    officialSourceUrl: "https://www.jetbrains.com/support/",
    officialSourceLabel: "JetBrains Support",
    issues: [
      {
        title: "License Key Won't Enter / \"OK\" Button Stays Disabled",
        symptoms:
          "The activation dialog rejects a pasted license key and the confirm button remains greyed out.",
        steps: [
          "Confirm you're using the right key format — some products need a 4-line key, others a single long offline activation code string.",
          "Re-copy the key carefully, making sure no leading/trailing whitespace or line breaks were accidentally included.",
          "Drag-and-drop the activation code file directly into the dialog instead of pasting, if copy/paste keeps failing.",
          "Verify the key actually covers the IDE version you're trying to unlock (an older/newer key won't validate).",
          "If the field still shows red, log into your JetBrains Account to confirm the license is active and reissue/redownload the code.",
        ],
        sourceUrl:
          "https://intellij-support.jetbrains.com/hc/en-us/articles/207241025-Can-t-enter-license-OK-button-disabled-key-not-accepted",
      },
      {
        title: "IDE Can't Connect to JetBrains Account / Activation Server Unreachable",
        symptoms:
          "The IDE shows a connection error when trying to reach JetBrains' licensing servers to validate or renew a subscription.",
        steps: [
          "Check basic connectivity by opening the JetBrains Account site directly in a browser from the same machine.",
          "Check whether a corporate firewall or proxy is blocking outbound access to JetBrains' license/account endpoints, and allowlist them if needed.",
          "Configure the IDE's proxy settings (Settings > Appearance & Behavior > System Settings > HTTP Proxy) to match your network's proxy.",
          "If persistent connectivity isn't possible, switch to offline activation: generate an offline activation code from your JetBrains Account and enter it manually in the IDE.",
          "Collect the idea.log file if the issue persists and escalate to JetBrains support.",
        ],
        sourceUrl:
          "https://intellij-support.jetbrains.com/hc/en-us/articles/4407356204178-IDE-Can-t-Connect-to-JetBrains-Account",
      },
      {
        title: "\"Unlicensed Product\" Error After Purchase/Renewal",
        symptoms:
          "The IDE reports it is unlicensed even though the user has an active subscription or purchased license.",
        steps: [
          "Open Help > Register (or the license dialog) and re-check which license source is currently applied.",
          "Re-activate using \"Log in to JetBrains Account\" so the IDE re-syncs your current subscription status.",
          "If you're offline or account-based activation fails, request and apply a fresh offline activation code tied to your license.",
          "Make sure any previously installed trial or personal license isn't conflicting with the org/business license — remove the old one first.",
          "Confirm your subscription hasn't actually lapsed by checking the licenses page in your JetBrains Account.",
        ],
        sourceUrl:
          "https://intellij-support.jetbrains.com/hc/en-us/sections/201563109-Installation-and-Licensing",
      },
      {
        title: "License Server Unreachable / Ticket Sync Failures",
        symptoms:
          "IDEs configured against an internal JetBrains License Server can't obtain or renew their license \"ticket,\" especially for users working offline or behind restrictive networks.",
        steps: [
          "Verify the license server URL is reachable from the affected machine (test by opening it directly in a browser).",
          "Check for DNS resolution or firewall/proxy rules blocking the connection between the IDE and the license server.",
          "Ask the License Server admin to enable \"permanent\" tickets for the affected product so users can request an offline-usable ticket in advance.",
          "Have the user request that permanent ticket from within the IDE before going offline.",
          "If tickets still fail to validate, capture the IDE log and have the server admin cross-check server-side logs for rejected requests.",
        ],
        sourceUrl:
          "https://intellij-support.jetbrains.com/hc/en-us/sections/201563109-Installation-and-Licensing",
      },
    ],
  },
  {
    slug: "docker-desktop",
    name: "Docker Desktop",
    category: "Developer & Design Tools",
    blurb: "Local container runtime — daemon, resource and startup issues.",
    officialSourceUrl:
      "https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/",
    officialSourceLabel: "Docker Docs — Troubleshoot Docker Desktop",
    issues: [
      {
        title: "Docker Desktop Fails to Start Due to Virtualization Problems",
        symptoms:
          "Docker Desktop hangs or errors out on launch with virtualization/Hyper-V/WSL-related failures, often citing errors like \"Unexpected WSL error.\"",
        steps: [
          "Confirm virtualization is enabled in the machine's BIOS/UEFI settings.",
          "On Windows, enable the \"Virtual Machine Platform\" and \"Windows Subsystem for Linux\" optional features, then reboot.",
          "Run `bcdedit /set hypervisorlaunchtype auto` from an elevated prompt to make sure the hypervisor launches at boot.",
          "Verify WSL2 is functioning with `wsl -l -v` and `wsl -d docker-desktop echo \"WSL 2 is working\"`.",
          "If running inside a VM, enable nested virtualization on the host hypervisor.",
          "Check that antivirus software isn't blocking Hyper-V/virtualization access, and add Docker to its exclusions if so.",
        ],
        sourceUrl:
          "https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/topics/",
      },
      {
        title: "Docker Desktop \"Access Denied\" on Windows",
        symptoms:
          "A user launches Docker Desktop and gets an access-denied error rather than a normal startup.",
        steps: [
          "Open Computer Management and add the affected Windows user account to the local `docker-users` group.",
          "Sign the user out and back in (or reboot) so the new group membership takes effect.",
          "Relaunch Docker Desktop and confirm it starts normally.",
        ],
        sourceUrl:
          "https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/topics/",
      },
      {
        title: "Docker Desktop Won't Start Because of Low Disk Space",
        symptoms:
          "Docker Desktop hangs on startup or refuses to start when the underlying VM disk image has run out of space.",
        steps: [
          "Open Docker Desktop's Troubleshoot menu and choose \"Clean / Purge data\" to free space, selecting all relevant checkboxes.",
          "Alternatively run `docker system prune` from a terminal to remove unused images, containers, and volumes.",
          "Check and, if needed, raise the \"Disk usage limit\" under Settings > Resources > Advanced.",
          "Move the disk image to a drive with more free space via the \"Disk image location\" setting.",
          "Restart Docker Desktop once space has been reclaimed.",
        ],
        sourceUrl: "https://docs.docker.com/desktop/settings-and-maintenance/settings/",
      },
      {
        title: "Docker Desktop Running Slowly / Poor File-Sharing Performance",
        symptoms:
          "Containers or file operations feel sluggish, especially with large numbers of shared files between host and container.",
        steps: [
          "In Settings > Resources > File Sharing, only share the specific directories a container actually needs — avoid sharing broad/large folders.",
          "Store non-code data (caches, databases) in a named Docker volume instead of a bind-mounted host folder.",
          "On Mac, use the VirtioFS file-sharing backend (fastest option, default on newer versions) instead of the legacy osxfs backend.",
          "On Windows, keep project files inside the WSL2 filesystem rather than the Windows (C:\\) drive to avoid path-translation overhead.",
          "Increase memory/disk allocation under Settings > Resources if workloads are resource-constrained.",
        ],
        sourceUrl: "https://docs.docker.com/desktop/settings-and-maintenance/settings/",
      },
    ],
  },
  {
    slug: "figma",
    name: "Figma",
    category: "Developer & Design Tools",
    blurb: "Design and prototyping tool — SSO, access and sync issues.",
    officialSourceUrl:
      "https://help.figma.com/hc/en-us/sections/1500000378401-Troubleshoot",
    officialSourceLabel: "Figma Help Center — Troubleshoot",
    issues: [
      {
        title: "Can't Log In via Company SSO / SAML",
        symptoms:
          "A user with company-provisioned SSO can't sign into Figma, or gets an error when authenticating through the identity provider.",
        steps: [
          "Confirm the organization actually has SAML SSO enabled — if not enforced, the user should sign in with email/password instead.",
          "If SSO enforcement was recently turned on, have the user sign out completely and sign back in specifically via the SSO flow (not a cached session).",
          "Check whether the user's account has actually been provisioned/assigned Figma access on the identity-provider side; have IT confirm or provision them.",
          "Rule out de-provisioning — if the user was removed from the IdP's Figma app assignment, they'll need to be re-added by an admin.",
          "Clear browser cookies/cache or try an incognito window in case a stale session is interfering.",
        ],
        sourceUrl:
          "https://help.figma.com/hc/en-us/articles/360041064554-Log-in-or-add-accounts",
      },
      {
        title: "User Can't Access or Edit a File Despite Having Permissions",
        symptoms:
          "A team member sees an empty folder, can't open a shared file, or has \"can edit\" access but still can't make changes.",
        steps: [
          "Check whether the user has only \"audience\" (org-wide) access rather than a direct individual invite — invite them to the specific folder/file directly, since folder access cascades to its contents.",
          "For newly added team/org members, remember that joining a plan doesn't auto-grant file visibility on Starter/Professional tiers — invite them to the relevant folders explicitly.",
          "If access was supposedly removed but the user still gets in, check for lingering access via audience settings or a parent folder/team role, and revoke there too.",
          "If the user has edit permission but still can't edit, verify they also hold a seat type that matches the file's product (e.g., a Figma Design seat, not just a Collab/viewer seat).",
          "If problems persist, contact Figma support with the file URL so they can inspect the account's actual permission state.",
        ],
        sourceUrl:
          "https://help.figma.com/hc/en-us/articles/35361119554711-File-and-folder-permissions",
      },
      {
        title: "Figma Desktop App Is Slow, Frozen, or Misbehaving",
        symptoms:
          "The Figma desktop app becomes unresponsive, renders incorrectly, or otherwise misbehaves in ways not seen in the browser.",
        steps: [
          "On Mac, go to Help > Troubleshooting > Reset Figma and Restart from the app menu.",
          "If the app is unresponsive, force-quit it and manually clear the cache via Terminal, then relaunch.",
          "On Windows, use Help > Troubleshooting > Clear cache from the in-app menu.",
          "If the Windows app won't respond, close it, open %APPDATA%\\Figma, and delete the Desktop and DesktopProfile folders (plus font_cache/settings files if present).",
          "Relaunch the app and confirm normal behavior returns.",
        ],
        sourceUrl:
          "https://help.figma.com/hc/en-us/articles/22380853110551-Clear-the-Figma-desktop-app-cache",
      },
      {
        title: "General Performance Problems (Large Files, Lag, Slow Sync)",
        symptoms:
          "Files load slowly, the canvas lags, images render at low resolution, or changes seem slow to reflect for collaborators.",
        steps: [
          "Close unused Figma browser tabs — each tab has its own memory ceiling, and Figma will warn as usage climbs.",
          "Force-quit and restart Figma (browser tab or desktop app) to release memory.",
          "Turn off multiplayer cursors, layout guides, and heavy effects while working on large files, and split very large files into smaller ones where possible.",
          "Verify a stable internet connection, and confirm WebGL is enabled and functioning.",
          "Check whether a VPN, proxy, or browser extension is interfering, and add Figma to any relevant allowlists or disable the extension.",
          "Clear the desktop app cache (see above) if issues are desktop-specific.",
        ],
        sourceUrl:
          "https://help.figma.com/hc/en-us/articles/360040523973-Troubleshooting-checklist",
      },
    ],
  },
  {
    slug: "dell",
    name: "Dell",
    category: "Hardware",
    blurb: "Enterprise laptops and desktops — power, display and hardware faults.",
    officialSourceUrl:
      "https://www.dell.com/support/contents/en-us/category/product-support/self-support-knowledgebase/fix-common-issues",
    officialSourceLabel: "Dell Support — Fix common issues",
    issues: [
      {
        title: "Computer Won't Power On",
        symptoms:
          "Pressing the power button produces no response at all — no LEDs, no fans, no signs of activity.",
        steps: [
          "Confirm the wall outlet works by testing another device in it.",
          "For laptops, ensure the AC adapter is securely connected to both the laptop and outlet, and try a different outlet, bypassing any power strip/surge protector.",
          "Inspect the AC adapter for physical damage and try a different Dell-approved adapter if available.",
          "Remove the battery (if removable) and attempt to power on using AC power alone.",
          "Disconnect all external peripherals in case one is causing a short or boot block.",
          "Perform a real-time-clock reset by holding the power button for 30-35 seconds until the LED blinks three times.",
        ],
        sourceUrl:
          "https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/fix-common-issues/no-power",
      },
      {
        title: "Laptop Battery Not Charging",
        symptoms:
          "The laptop is plugged in but the battery doesn't charge, drains while connected, or won't hold a charge.",
        steps: [
          "Confirm the outlet works with another device and try a different outlet.",
          "Inspect the charging port for dust/debris (clean with compressed air) and check the cable for fraying or bent pins.",
          "Do a hard reset: power off, disconnect adapter and battery, disconnect peripherals, hold the power button 15-20 seconds, then reconnect and restart.",
          "In Device Manager, uninstall the \"Microsoft ACPI-Compliant Control Method Battery\" driver and let Windows reinstall it on reboot.",
          "Run Dell SupportAssist to update BIOS and drivers.",
          "Run the Dell battery diagnostic test through SupportAssist, and contact Dell support if it reports a hardware fault.",
        ],
        sourceUrl:
          "https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/battery-and-power/ac-adapter",
      },
      {
        title: "Laptop Screen Is Black or Showing Display Problems",
        symptoms:
          "The screen stays black despite the laptop being powered on, or shows flickering, distortion, or lines.",
        steps: [
          "Try increasing brightness (Fn + brightness key) in case the panel is simply dimmed all the way down.",
          "Connect an external monitor to determine whether the issue is isolated to the built-in LCD panel.",
          "Disconnect external peripherals that might be interfering with startup/display initialization.",
          "Restart graphics drivers with Windows key + Ctrl + Shift + B, or roll back/reinstall the display driver via Dell's driver downloads if the issue started after an update.",
          "Boot into Safe Mode to check whether third-party software is causing the problem, and use System Restore if needed.",
          "If the panel shows physical damage (cracks, impact marks, liquid exposure), treat it as a hardware repair case rather than a software fix.",
        ],
        sourceUrl:
          "https://www.dell.com/support/kbdoc/en-us/000134946/how-to-troubleshoot-display-or-video-issues-on-dell-laptop-lcd-panel",
      },
      {
        title: "Wi-Fi / Wireless Network Adapter Not Working",
        symptoms:
          "The computer can't connect to Wi-Fi, drops connections repeatedly, or shows no wireless networks at all.",
        steps: [
          "Confirm Wi-Fi is enabled in BIOS and that airplane mode is off; toggle the adapter off/on or run the Windows network troubleshooter.",
          "In Device Manager, uninstall the Wi-Fi adapter and reboot so Windows reinstalls it automatically.",
          "Update the wireless adapter driver and system BIOS via Dell SupportAssist.",
          "Test alternative DNS servers (e.g., Google/Cloudflare) if pages fail to load despite showing a connection.",
          "Perform a clean boot to rule out third-party software conflicts.",
          "Restart the WLAN AutoConfig service, and if problems persist, run Dell's advanced network diagnostics and check Event Logs for adapter errors.",
        ],
        sourceUrl:
          "https://www.dell.com/support/kbdoc/en-us/000132488/windows-10-wireless-networking-usage-and-troubleshooting-guide-for-the-home",
      },
    ],
  },
];

export function getTroubleshootingProduct(slug: string) {
  return TROUBLESHOOTING_PRODUCTS.find((product) => product.slug === slug);
}
