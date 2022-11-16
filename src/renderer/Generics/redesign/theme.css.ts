import { createTheme } from '@vanilla-extract/css';

export const common = {
  color: {
    white100: '#FFFFFF',
    white90: 'rgba(255, 255, 255, 0.90)',
    white85: 'rgba(255, 255, 255, 0.85)',
    white70: 'rgba(255, 255, 255, 0.70)',
    white50: 'rgba(255, 255, 255, 0.50)',
    white40: 'rgba(255, 255, 255, 0.40)',
    white25: 'rgba(255, 255, 255, 0.25)',
    white15: 'rgba(255, 255, 255, 0.15)',
    white10: 'rgba(255, 255, 255, 0.10)',
    white8: 'rgba(255, 255, 255, 0.08)',
    white4: 'rgba(255, 255, 255, 0.04)',
    white0: 'rgba(255, 255, 255, 0)',
    black100: '#000002',
    black90: 'rgba(0, 0, 2, 0.90)',
    black85: 'rgba(0, 0, 2, 0.85)',
    black70: 'rgba(0, 0, 2, 0.70)',
    black50: 'rgba(0, 0, 2, 0.50)',
    black40: 'rgba(0, 0, 2, 0.40)',
    black25: 'rgba(0, 0, 2, 0.25)',
    black15: 'rgba(0, 0, 2, 0.15)',
    black10: 'rgba(0, 0, 2, 0.10)',
    black8: 'rgba(0, 0, 2, 0.08)',
    black4: 'rgba(0, 0, 2, 0.04)',
    black0: 'rgba(0, 0, 2, 0)',
    purple50: '#F1F3FF',
    purple100: '#E9E9FF',
    purple200: '#DAD6FF',
    purple300: '#C0B6FF',
    purple400: '#A18CFF',
    purple500: '#8267EF',
    purple600: '#753BF4',
    purple700: '#652AE0',
    purple800: '#5523BD',
    purple900: '#342673',
    green50: '#E8FCEE',
    green100: '#DCFAE5',
    green200: '#C2F4D3',
    green300: '#95EAB2',
    green400: '#63D889',
    green500: '#45C16A',
    green600: '#37A055',
    green700: '#2C7E45',
    green800: '#26653A',
    green900: '#203C29',
    orange50: '#FCF3EE',
    orange100: '#FDECDB',
    orange200: '#FDD8B0',
    orange300: '#FCBA79',
    orange400: '#FB9241',
    orange500: '#F97320',
    orange600: '#E95818',
    orange700: '#C14116',
    orange800: '#9A3518',
    orange900: '#5C2D1F',
    red50: '#FEF2F2',
    red100: '#FEE2E2',
    red200: '#FECACA',
    red300: '#F6A8A5',
    red400: '#F47671',
    red500: '#EB534C',
    red600: '#D83025',
    red700: '#B4261B',
    red800: '#95231A',
    red900: '#5C231E',
    blue50: '#EFF6FF',
    blue100: '#E0EDFF',
    blue200: '#C8DDFE',
    blue300: '#9DC2FE',
    blue400: '#6DA3F9',
    blue500: '#4C80F6',
    blue600: '#3A5FE9',
    blue700: '#324AD5',
    blue800: '#2E3CAC',
    blue900: '#2E356B',
    yellow50: '#FDFAD8',
    yellow100: '#FEF8BE',
    yellow200: '#FFF18B',
    yellow300: '#FDE148',
    yellow400: '#FBCD19',
    yellow500: '#EBB510',
    yellow600: '#CC8C0D',
    yellow700: '#A06205',
    yellow800: '#7B4709',
    yellow900: '#5D330E',
    pink50: '#FDF2F8',
    pink100: '#FCE7F3',
    pink200: '#FBCFE8',
    pink300: '#F9A8D4',
    pink400: '#F472B6',
    pink500: '#EE459A',
    pink600: '#DC2577',
    pink700: '#BE175D',
    pink800: '#97114B',
    pink900: '#571933',
    osMac: '#1C1C1E',
    ethereum: '#6DA3F9',
    ethereumValidating: '#998FF1',
    arbitrum: '#28a0f0',
    starknet: '#373795',
    zkSync: '#8C8DFC',
    livepeer: '#28cd88',
    radicle: '#B17CD9',
    nimbus: '#F96767',
    besu: '#29A2A1',
    lodestar: '#29A2A1',
    nethermind: '#FF9800',
    teku: '#2C56DE',
    lighthouse: '#D21ED2',
    prysm: '#67B2B8',
    erigon: '#AE793C',
    geth: '#18BC9C',
    green: 'rgba(62, 187, 100, 1)',
    yellow: 'rgba(251, 146, 65, 1)',
    red: 'rgba(235, 83, 76, 1)',
  },
};

export const [lightTheme, vars] = createTheme({
  color: {
    font: common.color.black85,
    font8: common.color.black8,
    font10: common.color.black10,
    font25: common.color.black25,
    font40: common.color.black40,
    font50: common.color.black50,
    font70: common.color.black70,
    fontDisabled: common.color.black25,
    background: common.color.white100,
    background96: common.color.black4,
    background92: common.color.black8,
    backgroundHoverGradient: `linear-gradient(0deg, ${common.color.black4}, ${common.color.black4}), #FFFFFF`,
    backgroundActiveGradient: `linear-gradient(0deg, ${common.color.black4}, ${common.color.black4}), #FFFFFF`,
    backgroundDisabled: common.color.black4,
    border: common.color.black10,
    border15: common.color.black15,
    primary: common.color.purple600,
    primaryHover: common.color.purple600,
    primaryActive: common.color.purple700,
    elevation1boxShadow: `0px 1px 2px rgba(0, 0, 0, 0.06)`,
    elevation2boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.04)`,
    elevation3boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.14)`,
    elevation4boxShadow: `0px 8px 16px rgba(0, 0, 0, 0.14)`,
    elevation5boxShadow: `0px 32px 64px rgba(0, 0, 0, 0.1876), 0px 2px 21px rgba(0, 0, 0, 0.1474)`,
    elevation6boxShadow: `0px 32px 64px rgba(0, 0, 0, 0.28), 0px 2px 20px rgba(0, 0, 0, 0.22)`,
  },
  components: {
    buttonBoxShadow: `0px 1px 2px ${common.color.black8}`,
    selectCardBackground: 'rgba(115, 81, 235, 0.08)',
    selectCardBoxShadow: `inset 0px 0px 0px 4px ${common.color.white8}`,
    toggleBackground: 'rgba(0 0 2 / 0.15)',
    toggleCheckedBackground: common.color.purple600,
    versionBorder: `1px solid ${common.color.black10}`,
    metricTypeIcon: 'rgba(0, 0, 2, 0.5)',
    secondaryButtonBackground: common.color.white100,
    bannerBackground: common.color.white25,
    bannerBoxShadow: `0px 1px 1px ${common.color.black10}, inset 0px 1px 0px ${common.color.white25}`,
    sidebarBorder: `1px solid ${common.color.black10}`,
    sidebarBackground: 'rgba(232, 233, 233, 0.84)',
    clientCardBackground: common.color.white100,
    clientCardTopBackground: common.color.black4,
    clientCardTopBackgroundHover: common.color.black10,
    clientCardBorder: `1px solid ${common.color.black8}`,
    clientCardBoxShadow: `0px 2px 4px ${common.color.black4}`,
    labelGreenBackground: common.color.green50,
    labelRedBackground: common.color.red50,
    labelGrayBackground: common.color.black4,
    labelPinkBackground: common.color.pink50,
    labelPurpleBackground: common.color.purple50,
    labelOrangeBackground: common.color.orange50,
    labelPink2Background: common.color.pink200,
    labelGreenFontColor: common.color.green600,
    labelRedFontColor: common.color.red500,
    labelGrayFontColor: common.color.black50,
    labelPinkFontColor: common.color.pink500,
    labelPurpleFontColor: common.color.purple500,
    labelOrangeFontColor: common.color.orange500,
    labelPink2FontColor: common.color.black85,
    linkHoverDanger: common.color.red700,
    tagPinkBackground: common.color.pink200,
    tagPink2Background: common.color.pink100,
    tagGreenBackground: common.color.green100,
    tagPinkFontColor: common.color.black70,
    tagPink2FontColor: common.color.pink500,
    tagGreenFontColor: common.color.green600,
    modalBackdropBackground: 'rgba(0, 0, 2, 0.25)',
    messageInfoBackground: common.color.blue50,
    messageWarningBackground: common.color.orange50,
    messageErrorBackground: common.color.red50,
    messageSuccessBackground: common.color.green50,
    messageInfoIcon: common.color.blue400,
    messageWarningIcon: common.color.orange400,
    messageErrorIcon: common.color.red400,
    messageSuccessIcon: common.color.green400,
    iconFilterInvertForDarkOnly: 'invert(0)',
    nodeIconStopped: common.color.black40,
    walletPromptBackground: common.color.purple50,
    headerButtonHover: common.color.black4,
    headerButtonActive: common.color.black8,
    menuBackground: common.color.white100,
    menuBorder: `1px solid ${common.color.black4}`,
    checkboxBackground: common.color.white100,
    checkboxBorder: common.color.black25,
    menuItemSelectIcon: common.color.purple600,
  },
});

export const darkTheme = createTheme(vars, {
  color: {
    font: common.color.white85,
    font8: common.color.white8,
    font10: common.color.white10,
    font25: common.color.white25,
    font40: common.color.white40,
    font50: common.color.white50,
    font70: common.color.white70,
    fontDisabled: common.color.white25,
    background: 'rgba(28, 28, 30, 1)',
    background96: common.color.white4,
    background92: common.color.white8,
    backgroundHoverGradient: common.color.white8,
    backgroundActiveGradient: common.color.white4,
    backgroundDisabled: common.color.white4,
    border: common.color.white10,
    border15: common.color.white15,
    primary: common.color.purple600,
    primaryHover: common.color.purple500,
    primaryActive: common.color.purple500,
    elevation1boxShadow: `0px 1px 2px rgba(0, 0, 0, 0.24)`,
    elevation2boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.1)`,
    elevation3boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.26)`,
    elevation4boxShadow: `0px 8px 16px rgba(0, 0, 0, 0.28)`,
    elevation5boxShadow: `0px 32px 64px rgba(0, 0, 0, 0.37), 0px 2px 21px rgba(0, 0, 0, 0.37)`,
    elevation6boxShadow: `0px 32px 64px rgba(0, 0, 0, 0.56), 0px 2px 21px rgba(0, 0, 0, 0.55)`,
  },
  components: {
    buttonBoxShadow: '0px 1px 2px rgba(0, 0, 0, 0.24)',
    selectCardBackground: 'rgba(130, 103, 239, 0.08)',
    selectCardBoxShadow: 'none',
    toggleBackground: 'rgba(255 255 255 / 0.15)',
    toggleCheckedBackground: common.color.purple500,
    versionBorder: `1px solid ${common.color.white10}`,
    metricTypeIcon: common.color.white50,
    secondaryButtonBackground: common.color.white4,
    bannerBackground: common.color.white4,
    bannerBoxShadow: `0px 1px 1px ${common.color.black15}, inset 0px 1px 0px ${common.color.white8}`,
    sidebarBorder: `1px solid ${common.color.black90}`,
    sidebarBackground: 'rgba(38, 38, 39, 0.8)',
    clientCardBackground: common.color.white4,
    clientCardTopBackground: common.color.black15,
    clientCardTopBackgroundHover: common.color.black8,
    clientCardBorder: `1px solid ${common.color.white8}`,
    clientCardBoxShadow: `0px 2px 4px ${common.color.black10}`,
    labelGreenBackground: 'rgba(97, 218, 136, 0.25)',
    labelRedBackground: 'rgba(235, 83, 76, 0.25)',
    labelGrayBackground: common.color.white8,
    labelPinkBackground: 'rgba(251, 116, 195, 0.25)',
    labelPurpleBackground: 'rgba(153, 143, 241, 0.25)',
    labelOrangeBackground: 'rgba(251, 146, 65, 0.25)',
    labelPink2Background: 'rgba(251, 116, 195, 0.25)',
    labelGreenFontColor: common.color.green400,
    labelRedFontColor: common.color.red400,
    labelGrayFontColor: common.color.white40,
    labelPinkFontColor: common.color.pink400,
    labelPurpleFontColor: common.color.purple400,
    labelOrangeFontColor: common.color.orange400,
    labelPink2FontColor: common.color.white70,
    linkHoverDanger: common.color.red400,
    tagPinkBackground: 'rgba(251, 116, 195, 0.25)',
    tagPink2Background: 'rgba(254, 227, 249, 1)',
    tagGreenBackground: 'rgba(220, 250, 229, 1)',
    tagPinkFontColor: common.color.white70,
    tagPink2FontColor: 'rgba(236, 66, 159, 1)',
    tagGreenFontColor: 'rgba(55, 160, 85, 1)',
    modalBackdropBackground: 'rgba(0, 0, 2, 0.4)',
    messageInfoBackground: common.color.blue900,
    messageWarningBackground: common.color.orange900,
    messageErrorBackground: common.color.red900,
    messageSuccessBackground: common.color.green900,
    messageInfoIcon: common.color.blue600,
    messageWarningIcon: common.color.orange600,
    messageErrorIcon: common.color.red600,
    messageSuccessIcon: common.color.green600,
    iconFilterInvertForDarkOnly: 'invert(.85)',
    nodeIconStopped: common.color.white40,
    walletPromptBackground: common.color.purple900,
    headerButtonHover: common.color.white4,
    headerButtonActive: common.color.white8,
    menuBackground: common.color.osMac,
    menuBorder: `1px solid ${common.color.white10}`,
    checkboxBackground: common.color.osMac,
    checkboxBorder: common.color.white25,
    menuItemSelectIcon: common.color.purple500,
  },
});
