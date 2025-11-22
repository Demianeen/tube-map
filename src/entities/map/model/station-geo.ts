/**
 * Station geographic coordinates dataset.
 * Maps station IDs (matching stations.ts) to latitude/longitude coordinates.
 *
 * Coordinates are in WGS84 format (decimal degrees).
 * Data fetched from TfL Unified API: https://api.tfl.gov.uk
 * Generated: 2025-11-21T09:03:33.791Z
 */

export type StationGeo = {
  lat: number;
  lng: number;
};

/**
 * Map of station IDs to their geographic coordinates.
 * Only stations with known coordinates are included.
 * Missing stations will be skipped when finding nearest station.
 */
export const stationGeo: Record<string, StationGeo> = {
  Abbey_Road: { lat: 51.531926, lng: 0.003737 }, // Abbey Road DLR Station
  Abbey_Wood: { lat: 51.491241, lng: 0.121374 }, // Abbey Wood
  Acton_Central: { lat: 51.508716, lng: -0.262971 }, // Acton Central Rail Station
  Acton_Main_Line: { lat: 51.51718, lng: -0.266756 }, // Acton Main Line Rail Station
  Acton_Town: { lat: 51.503057, lng: -0.280462 }, // Acton Town Underground Station
  Aldgate: { lat: 51.514246, lng: -0.075689 }, // Aldgate Underground Station
  Aldgate_East: { lat: 51.515037, lng: -0.072384 }, // Aldgate East Underground Station
  All_Saints: { lat: 51.511, lng: -0.013135 }, // All Saints DLR Station
  Alperton: { lat: 51.540627, lng: -0.29961 }, // Alperton Underground Station
  Amersham: { lat: 51.674126, lng: -0.607714 }, // Amersham Underground Station
  Anerley: { lat: 51.412153, lng: -0.065886 }, // Anerley Rail Station
  Angel: { lat: 51.532624, lng: -0.105898 }, // Angel Underground Station
  Archway: { lat: 51.565478, lng: -0.134819 }, // Archway Underground Station
  Arnos_Grove: { lat: 51.616446, lng: -0.133062 }, // Arnos Grove Underground Station
  Arsenal: { lat: 51.558655, lng: -0.107457 }, // Arsenal Underground Station
  Baker_Street: { lat: 51.522883, lng: -0.15713 }, // Baker Street Underground Station
  Balham: { lat: 51.443288, lng: -0.152997 }, // Balham Underground Station
  Bank_Monument_hub: { lat: 51.5107, lng: -0.085969 }, // Monument Underground Station
  Barbican: { lat: 51.520275, lng: -0.097993 }, // Barbican Underground Station
  Barking: { lat: 51.539495, lng: 0.080903 }, // Barking Rail Station
  Barking_Riverside: { lat: 51.51953, lng: 0.11596 }, // Barking Riverside
  Barkingside: { lat: 51.585689, lng: 0.088585 }, // Barkingside Underground Station
  Barons_Court_district: { lat: 51.490311, lng: -0.213427 }, // Barons Court Underground Station
  Barons_Court_piccadilly: { lat: 51.490311, lng: -0.213427 }, // Barons Court Underground Station
  Battersea_Park: { lat: 51.4775, lng: -0.1475 }, // Battersea Park Rail Station
  Battersea_Power_Station: { lat: 51.479932, lng: -0.142142 }, // Battersea Power Station Underground Station
  Bayswater_circle: { lat: 51.512284, lng: -0.187938 }, // Bayswater Underground Station
  Bayswater_district: { lat: 51.512284, lng: -0.187938 }, // Bayswater Underground Station
  Beckton: { lat: 51.514362, lng: 0.061453 }, // Beckton DLR Station
  Beckton_Park: { lat: 51.508793, lng: 0.054932 }, // Beckton Park DLR Station
  Becontree: { lat: 51.540331, lng: 0.127016 }, // Becontree Underground Station
  Belsize_Park: { lat: 51.550529, lng: -0.164783 }, // Belsize Park Underground Station
  Bermondsey: { lat: 51.49775, lng: -0.063993 }, // Bermondsey Underground Station
  Bethnal_Green: { lat: 51.523917, lng: -0.059568 }, // Bethnal Green Rail Station
  Bethnal_Green_central: { lat: 51.523917, lng: -0.059568 }, // Bethnal Green Rail Station
  Blackfriars: { lat: 51.511581, lng: -0.103659 }, // Blackfriars Underground Station
  Blackhorse_Road: { lat: 51.586605, lng: -0.041236 }, // Blackhorse Road Rail Station
  Blackwall: { lat: 51.507991, lng: -0.006969 }, // Blackwall DLR Station
  Bond_Street: { lat: 51.51369, lng: -0.149517 }, // Bond Street
  Borough: { lat: 51.501199, lng: -0.09337 }, // Borough Underground Station
  Boston_Manor: { lat: 51.495635, lng: -0.324939 }, // Boston Manor Underground Station
  Bounds_Green: { lat: 51.607034, lng: -0.124235 }, // Bounds Green Underground Station
  Bow_Church: { lat: 51.527858, lng: -0.020936 }, // Bow Church DLR Station
  Bow_Road: { lat: 51.52694, lng: -0.025128 }, // Bow Road Underground Station
  Brent_Cross: { lat: 51.57665, lng: -0.213622 }, // Brent Cross Underground Station
  Brentwood: { lat: 51.613605, lng: 0.299586 }, // Brentwood Rail Station
  Brixton: { lat: 51.462618, lng: -0.114888 }, // Brixton Underground Station
  Brockley: { lat: 51.464649, lng: -0.037537 }, // Brockley Rail Station
  "Bromley-by-Bow_district": { lat: 51.524839, lng: -0.011538 }, // Bromley-by-Bow Underground Station
  "Bromley-by-Bow_hnc": { lat: 51.524839, lng: -0.011538 }, // Bromley-by-Bow Underground Station
  Brondesbury: { lat: 51.545166, lng: -0.202309 }, // Brondesbury Rail Station
  Brondesbury_Park: { lat: 51.540734, lng: -0.210054 }, // Brondesbury Park Rail Station
  Bruce_Grove: { lat: 51.593959, lng: -0.069867 }, // Bruce Grove Rail Station
  Buckhurst_Hill: { lat: 51.626605, lng: 0.046757 }, // Buckhurst Hill Underground Station
  Burnham: { lat: 51.523506, lng: -0.646374 }, // Burnham (Berks) Rail Station
  Burnt_Oak: { lat: 51.602774, lng: -0.264048 }, // Burnt Oak Underground Station
  Bush_Hill_Park: { lat: 51.641519, lng: -0.069221 }, // Bush Hill Park Rail Station
  Bushey: { lat: 51.645691, lng: -0.385612 }, // Bushey Rail Station
  Caledonian_Road: { lat: 51.548519, lng: -0.118493 }, // Caledonian Road Underground Station
  Caledonian_Road_and_Barnsbury: { lat: 51.543041, lng: -0.116729 }, // Caledonian Road & Barnsbury Rail Station
  Cambridge_Heath: { lat: 51.531973, lng: -0.057279 }, // Cambridge Heath (London) Rail Station
  Camden_Road: { lat: 51.541791, lng: -0.138701 }, // Camden Road Rail Station
  Camden_Town: { lat: 51.539292, lng: -0.14274 }, // Camden Town Underground Station
  Canada_Water: { lat: 51.49799, lng: -0.04972 }, // Canada Water Rail Station
  Canary_Wharf_dlr: { lat: 51.506321, lng: -0.018815 }, // Canary Wharf
  Canary_Wharf_elizabeth: { lat: 51.506321, lng: -0.018815 }, // Canary Wharf
  Canary_Wharf_jubilee: { lat: 51.506321, lng: -0.018815 }, // Canary Wharf
  Canning_Town: { lat: 51.514127, lng: 0.008101 }, // Canning Town DLR Station
  Cannon_Street: { lat: 51.51151, lng: -0.090432 }, // Cannon Street Underground Station
  Canonbury: { lat: 51.548732, lng: -0.092191 }, // Canonbury Rail Station
  Canons_Park: { lat: 51.607701, lng: -0.294693 }, // Canons Park Underground Station
  Carpenders_Park: { lat: 51.628351, lng: -0.385939 }, // Carpenders Park Rail Station
  Castle_Bar_Park: { lat: 51.5236, lng: -0.3317 }, // Castle Bar Park Rail Station
  Chadwell_Heath: { lat: 51.568039, lng: 0.128958 }, // Chadwell Heath Rail Station
  Chalfont_and_Latimer: { lat: 51.667985, lng: -0.560689 }, // Chalfont & Latimer Underground Station
  Chalk_Farm: { lat: 51.544118, lng: -0.153388 }, // Chalk Farm Underground Station
  Chancery_Lane: { lat: 51.518247, lng: -0.111583 }, // Chancery Lane Underground Station
  Charing_Cross: { lat: 51.50741, lng: -0.127277 }, // Charing Cross Underground Station
  Chesham: { lat: 51.705208, lng: -0.611247 }, // Chesham Underground Station
  Cheshunt: { lat: 51.702876, lng: -0.02396 }, // Cheshunt Rail Station
  Chigwell: { lat: 51.617916, lng: 0.075041 }, // Chigwell Underground Station
  Chingford: { lat: 51.633087, lng: 0.009897 }, // Chingford Rail Station
  Chiswick_Park: { lat: 51.494627, lng: -0.267972 }, // Chiswick Park Underground Station
  Chorleywood: { lat: 51.654358, lng: -0.518461 }, // Chorleywood Underground Station
  Clapham_Common: { lat: 51.461742, lng: -0.138317 }, // Clapham Common Underground Station
  Clapham_High_Street: { lat: 51.465481, lng: -0.132522 }, // Clapham High Street Rail Station
  Clapham_Junction: { lat: 51.464188, lng: -0.170293 }, // Clapham Junction Rail Station
  Clapham_North: { lat: 51.465135, lng: -0.130016 }, // Clapham North Underground Station
  Clapham_South: { lat: 51.452654, lng: -0.147582 }, // Clapham South Underground Station
  Clapton: { lat: 51.561644, lng: -0.057025 }, // Clapton Rail Station
  Cockfosters: { lat: 51.65152, lng: -0.149171 }, // Cockfosters Underground Station
  Colindale: { lat: 51.595424, lng: -0.249919 }, // Colindale Underground Station
  Colliers_Wood: { lat: 51.41816, lng: -0.178086 }, // Colliers Wood Underground Station
  Covent_Garden: { lat: 51.513093, lng: -0.124436 }, // Covent Garden Underground Station
  Crossharbour: { lat: 51.495728, lng: -0.014606 }, // Crossharbour DLR Station
  Crouch_Hill: { lat: 51.571302, lng: -0.117149 }, // Crouch Hill Rail Station
  Croxley: { lat: 51.647044, lng: -0.441718 }, // Croxley Underground Station
  Crystal_Palace: { lat: 51.418109, lng: -0.07261 }, // Crystal Palace Rail Station
  Custom_House_for_ExCeL: { lat: 51.509716, lng: 0.026699 }, // Custom House (for ExCel) DLR Station
  Cutty_Sark_for_Maritime_Greenwich: { lat: 51.481671, lng: -0.01081 }, // Cutty Sark (for Maritime Greenwich) DLR Station
  Cyprus: { lat: 51.508473, lng: 0.063925 }, // Cyprus DLR Station
  Dagenham_East: { lat: 51.544096, lng: 0.166017 }, // Dagenham East Underground Station
  Dagenham_Heathway: { lat: 51.541639, lng: 0.147527 }, // Dagenham Heathway Underground Station
  Dalston_Junction: { lat: 51.546116, lng: -0.075137 }, // Dalston Junction Rail Station
  Dalston_Kingsland: { lat: 51.548148, lng: -0.075701 }, // Dalston Kingsland Rail Station
  Debden: { lat: 51.645386, lng: 0.083782 }, // Debden Underground Station
  Denmark_Hill: { lat: 51.468203, lng: -0.089361 }, // Denmark Hill Rail Station
  Deptford_Bridge: { lat: 51.474215, lng: -0.022438 }, // Deptford Bridge DLR Station
  Devons_Road: { lat: 51.522667, lng: -0.017615 }, // Devons Road DLR Station
  Dollis_Hill: { lat: 51.551955, lng: -0.239068 }, // Dollis Hill Underground Station
  Drayton_Green: { lat: 51.5167, lng: -0.3317 }, // Drayton Green Rail Station
  Ealing_Broadway: { lat: 51.514841, lng: -0.301752 }, // Ealing Broadway Rail Station
  Ealing_Common: { lat: 51.51014, lng: -0.288265 }, // Ealing Common Underground Station
  Earls_Court: { lat: 51.492063, lng: -0.193378 }, // Earl's Court Underground Station
  East_Acton: { lat: 51.516612, lng: -0.247248 }, // East Acton Underground Station
  East_Finchley: { lat: 51.587131, lng: -0.165012 }, // East Finchley Underground Station
  East_Ham_district: { lat: 51.538948, lng: 0.051186 }, // East Ham Underground Station
  East_Ham_hnc: { lat: 51.538948, lng: 0.051186 }, // East Ham Underground Station
  East_India: { lat: 51.509359, lng: -0.002326 }, // East India DLR Station
  East_Putney: { lat: 51.459205, lng: -0.211 }, // East Putney Underground Station
  Eastcote_metropolitan: { lat: 51.576506, lng: -0.397373 }, // Eastcote Underground Station
  Eastcote_piccadilly: { lat: 51.576506, lng: -0.397373 }, // Eastcote Underground Station
  Edgware: { lat: 51.613653, lng: -0.274928 }, // Edgware Underground Station
  Edgware_Road_bakerloo: { lat: 51.519858, lng: -0.167832 }, // Edgware Road (Circle Line) Underground Station
  Edgware_Road_circle: { lat: 51.519858, lng: -0.167832 }, // Edgware Road (Circle Line) Underground Station
  Edmonton_Green: { lat: 51.624929, lng: -0.061112 }, // Edmonton Green Rail Station
  Elephant_And_Castle: { lat: 51.494536, lng: -0.100606 }, // Elephant & Castle Underground Station
  Elm_Park: { lat: 51.549775, lng: 0.19864 }, // Elm Park Underground Station
  Elverson_Road: { lat: 51.469074, lng: -0.016728 }, // Elverson Road DLR Station
  Embankment: { lat: 51.513233, lng: -0.088515 }, // Bank DLR Station
  Emerson_Park: { lat: 51.568642, lng: 0.220113 }, // Emerson Park Rail Station
  Enfield_Town: { lat: 51.652026, lng: -0.079328 }, // Enfield Town Rail Station
  Epping: { lat: 51.69368, lng: 0.113767 }, // Epping Underground Station
  Euston_Northern_Victoria: { lat: 51.528136, lng: -0.133924 }, // London Euston Rail Station
  Euston_Overground_NR: { lat: 51.528136, lng: -0.133924 }, // London Euston Rail Station
  Euston_Square_circle: { lat: 51.528055, lng: -0.132182 }, // Euston Underground Station
  Fairlop: { lat: 51.595618, lng: 0.091004 }, // Fairlop Underground Station
  Farringdon_circle: { lat: 51.519961, lng: -0.103051 }, // Farringdon
  Farringdon_elizabeth: { lat: 51.519961, lng: -0.103051 }, // Farringdon
  Fenchurch_Street: { lat: 51.373708, lng: -0.104361 }, // Church Street Tram Stop
  Finchley_Central: { lat: 51.600921, lng: -0.192527 }, // Finchley Central Underground Station
  Finchley_Road: { lat: 51.546825, lng: -0.179845 }, // Finchley Road Underground Station
  Finchley_Road_and_Frognal: { lat: 51.550266, lng: -0.183141 }, // Finchley Road & Frognal Rail Station
  Finsbury_Park: { lat: 51.564158, lng: -0.106825 }, // Finsbury Park Underground Station
  Forest_Gate: { lat: 51.549432, lng: 0.024353 }, // Forest Gate Rail Station
  Forest_Hill: { lat: 51.43928, lng: -0.053157 }, // Forest Hill Rail Station
  Fulham_Broadway: { lat: 51.480081, lng: -0.195422 }, // Fulham Broadway Underground Station
  Gallions_Reach: { lat: 51.508941, lng: 0.071555 }, // Gallions Reach DLR Station
  Gants_Hill: { lat: 51.576544, lng: 0.066185 }, // Gants Hill Underground Station
  Gidea_Park: { lat: 51.581904, lng: 0.205964 }, // Gidea Park Rail Station
  Gloucester_Road: { lat: 51.494316, lng: -0.182658 }, // Gloucester Road Underground Station
  Golders_Green: { lat: 51.572259, lng: -0.194039 }, // Golders Green Underground Station
  Goldhawk_Road_circle: { lat: 51.502005, lng: -0.226715 }, // Goldhawk Road Underground Station
  Goldhawk_Road_hnc: { lat: 51.502005, lng: -0.226715 }, // Goldhawk Road Underground Station
  Goodge_Street: { lat: 51.520599, lng: -0.134361 }, // Goodge Street Underground Station
  Goodmayes: { lat: 51.565579, lng: 0.110807 }, // Goodmayes Rail Station
  Gospel_Oak: { lat: 51.555335, lng: -0.15077 }, // Gospel Oak Rail Station
  Grange_Hill: { lat: 51.613378, lng: 0.092066 }, // Grange Hill Underground Station
  Great_Portland_Street_circle: { lat: 51.52384, lng: -0.144262 }, // Great Portland Street Underground Station
  Great_Portland_Street_hnc: { lat: 51.52384, lng: -0.144262 }, // Great Portland Street Underground Station
  Great_Portland_Street_metropolitan: { lat: 51.52384, lng: -0.144262 }, // Great Portland Street Underground Station
  Green_Park: { lat: 51.506947, lng: -0.142787 }, // Green Park Underground Station
  Greenford: { lat: 51.542424, lng: -0.34605 }, // Greenford Underground Station
  Greenwich: { lat: 51.478087, lng: -0.013673 }, // Greenwich DLR Station
  Gunnersbury: { lat: 51.491678, lng: -0.275286 }, // Gunnersbury Rail Station
  Hackney_Central: { lat: 51.547105, lng: -0.056058 }, // Hackney Central Rail Station
  Hackney_Downs: { lat: 51.548757, lng: -0.060819 }, // Hackney Downs Rail Station
  Hackney_Wick: { lat: 51.54341, lng: -0.02492 }, // Hackney Wick Rail Station
  Haggerston: { lat: 51.538705, lng: -0.075666 }, // Haggerston Rail Station
  Hainault: { lat: 51.603659, lng: 0.093482 }, // Hainault Underground Station
  Hammersmith_circle: { lat: 51.4923, lng: -0.22362 }, // Hammersmith (Dist&Picc Line) Underground Station
  Hammersmith_district: { lat: 51.4923, lng: -0.22362 }, // Hammersmith (Dist&Picc Line) Underground Station
  Hampstead: { lat: 51.556239, lng: -0.177464 }, // Hampstead Underground Station
  Hampstead_Heath: { lat: 51.55521, lng: -0.165705 }, // Hampstead Heath Rail Station
  Hanger_Lane: { lat: 51.530177, lng: -0.292704 }, // Hanger Lane Underground Station
  Hanwell: { lat: 51.511835, lng: -0.338583 }, // Hanwell Rail Station
  Harlesden_bakerloo: { lat: 51.536289, lng: -0.257667 }, // Harlesden Rail Station
  Harlesden_overground: { lat: 51.536289, lng: -0.257667 }, // Harlesden Rail Station
  Harold_Wood: { lat: 51.592766, lng: 0.233129 }, // Harold Wood Rail Station
  Harringay_Green_Lanes: { lat: 51.577182, lng: -0.098144 }, // Harringay Green Lanes Rail Station
  Harrow_and_Wealdstone: { lat: 51.592169, lng: -0.334571 }, // Harrow & Wealdstone Rail Station
  Harrow_on_the_Hill: { lat: 51.579195, lng: -0.337225 }, // Harrow-on-the-Hill Underground Station
  Hatch_End: { lat: 51.609417, lng: -0.368601 }, // Hatch End Rail Station
  Hatton_Cross: { lat: 51.466747, lng: -0.423191 }, // Hatton Cross Underground Station
  Hayes_and_Harlington: { lat: 51.503096, lng: -0.420683 }, // Hayes & Harlington Rail Station
  Headstone_Lane: { lat: 51.602649, lng: -0.35722 }, // Headstone Lane Rail Station
  Heathrow_23: { lat: 51.471352, lng: -0.45229 }, // Heathrow Terminals 1-2-3 Underground Station
  Heathrow_4_elizabeth: { lat: 51.458268, lng: -0.445463 }, // Heathrow Terminal 4 Rail Station
  Heathrow_4_piccadilly: { lat: 51.458268, lng: -0.445463 }, // Heathrow Terminal 4 Rail Station
  Heathrow_5_elizabeth: { lat: 51.470053, lng: -0.490589 }, // Heathrow Terminal 5 Rail Station
  Heathrow_5_Piccadilly: { lat: 51.470053, lng: -0.490589 }, // Heathrow Terminal 5 Rail Station
  Heathrow_Central: { lat: 51.471987, lng: -0.454788 }, // Heathrow Terminals 2 & 3 Rail Station
  Hendon_Central: { lat: 51.583301, lng: -0.226424 }, // Hendon Central Underground Station
  Heron_Quays: { lat: 51.503379, lng: -0.021421 }, // Heron Quays DLR Station
  High_Barnet: { lat: 51.650541, lng: -0.194298 }, // High Barnet Underground Station
  High_Street_Kensington_circle: { lat: 51.501055, lng: -0.192792 }, // High Street Kensington Underground Station
  High_Street_Kensington_district: { lat: 51.501055, lng: -0.192792 }, // High Street Kensington Underground Station
  Highams_Park: { lat: 51.60835, lng: -0.000222 }, // Highams Park Rail Station
  Highbury_and_Islington: { lat: 51.546177, lng: -0.103764 }, // Highbury & Islington Rail Station
  Highgate: { lat: 51.577532, lng: -0.145857 }, // Highgate Underground Station
  Hillingdon_metropolitan: { lat: 51.553715, lng: -0.449828 }, // Hillingdon Underground Station
  Hillingdon_piccadilly: { lat: 51.553715, lng: -0.449828 }, // Hillingdon Underground Station
  Holborn: { lat: 51.51758, lng: -0.120475 }, // Holborn Underground Station
  Holland_Park: { lat: 51.507143, lng: -0.205679 }, // Holland Park Underground Station
  Holloway_Road: { lat: 51.552697, lng: -0.113244 }, // Holloway Road Underground Station
  Homerton: { lat: 51.547012, lng: -0.04236 }, // Homerton Rail Station
  Honor_Oak_Park: { lat: 51.449989, lng: -0.045505 }, // Honor Oak Park Rail Station
  Hornchurch: { lat: 51.554093, lng: 0.219116 }, // Hornchurch Underground Station
  Hounslow_Central: { lat: 51.471295, lng: -0.366578 }, // Hounslow Central Underground Station
  Hounslow_East: { lat: 51.473213, lng: -0.356474 }, // Hounslow East Underground Station
  Hounslow_West: { lat: 51.473469, lng: -0.386544 }, // Hounslow West Underground Station
  Hoxton: { lat: 51.531512, lng: -0.075681 }, // Hoxton Rail Station
  Hyde_Park_Corner: { lat: 51.503035, lng: -0.152441 }, // Hyde Park Corner Underground Station
  Ickenham: { lat: 51.561992, lng: -0.442001 }, // Ickenham Underground Station
  Ilford: { lat: 51.559118, lng: 0.06968 }, // Ilford Rail Station
  Imperial_Wharf: { lat: 51.474949, lng: -0.182823 }, // Imperial Wharf Rail Station
  Island_Gardens: { lat: 51.487811, lng: -0.010139 }, // Island Gardens DLR Station
  Iver: { lat: 51.508503, lng: -0.506726 }, // Iver Rail Station
  Kennington: { lat: 51.488337, lng: -0.105963 }, // Kennington Underground Station
  Kensal_Green_bakerloo: { lat: 51.53054, lng: -0.225088 }, // Kensal Green Rail Station
  Kensal_Green_overground: { lat: 51.53054, lng: -0.225088 }, // Kensal Green Rail Station
  Kensal_Rise: { lat: 51.534554, lng: -0.219957 }, // Kensal Rise Rail Station
  Kensington_Olympia: { lat: 51.497899, lng: -0.210364 }, // Kensington (Olympia) Rail Station
  Kentish_Town: { lat: 51.550312, lng: -0.140733 }, // Kentish Town Underground Station
  Kentish_Town_West: { lat: 51.546548, lng: -0.146655 }, // Kentish Town West Rail Station
  Kenton: { lat: 51.581802, lng: -0.316981 }, // Kenton Rail Station
  Kew_Gardens_district: { lat: 51.477073, lng: -0.285054 }, // Kew Gardens Rail Station
  Kew_Gardens_overground: { lat: 51.477073, lng: -0.285054 }, // Kew Gardens Rail Station
  Kilburn: { lat: 51.547183, lng: -0.204248 }, // Kilburn Underground Station
  Kilburn_High_Road: { lat: 51.537277, lng: -0.192237 }, // Kilburn High Road Rail Station
  Kilburn_Park: { lat: 51.534979, lng: -0.194232 }, // Kilburn Park Underground Station
  King_George_V: { lat: 51.502003, lng: 0.062624 }, // King George V DLR Station
  Kings_Cross_St_Pancras: { lat: 51.530663, lng: -0.123194 }, // King's Cross St. Pancras Underground Station
  Kingsbury: { lat: 51.584845, lng: -0.27879 }, // Kingsbury Underground Station
  Knightsbridge: { lat: 51.501669, lng: -0.160508 }, // Knightsbridge Underground Station
  Ladbroke_Grove_circle: { lat: 51.517449, lng: -0.210391 }, // Ladbroke Grove Underground Station
  Ladbroke_Grove_hnc: { lat: 51.517449, lng: -0.210391 }, // Ladbroke Grove Underground Station
  Lambeth_North: { lat: 51.498808, lng: -0.112315 }, // Lambeth North Underground Station
  Lancaster_Gate: { lat: 51.511723, lng: -0.175494 }, // Lancaster Gate Underground Station
  Langdon_Park: { lat: 51.515172, lng: -0.01415 }, // Langdon Park DLR Station
  Langley: { lat: 51.508062, lng: -0.541756 }, // Langley (Berks) Rail Station
  Latimer_Road_circle: { lat: 51.513389, lng: -0.217799 }, // Latimer Road Underground Station
  Latimer_Road_hnc: { lat: 51.513389, lng: -0.217799 }, // Latimer Road Underground Station
  Leicester_Square: { lat: 51.511386, lng: -0.128426 }, // Leicester Square Underground Station
  Lewisham: { lat: 51.464665, lng: -0.012874 }, // Lewisham DLR Station
  Leyton: { lat: 51.556589, lng: -0.005523 }, // Leyton Underground Station
  Leyton_Midland_Road: { lat: 51.569725, lng: -0.008051 }, // Leyton Midland Road Rail Station
  Leytonstone: { lat: 51.568324, lng: 0.008194 }, // Leytonstone Underground Station
  Leytonstone_High_Road: { lat: 51.563554, lng: 0.008416 }, // Leytonstone High Road Rail Station
  Limehouse: { lat: 51.512393, lng: -0.039809 }, // Limehouse DLR Station
  Liverpool_Street_circle_base: { lat: 51.517991, lng: -0.081426 }, // London Liverpool Street Rail Station
  Liverpool_Street_circle_top: { lat: 51.517991, lng: -0.081426 }, // London Liverpool Street Rail Station
  Liverpool_Street_elizabeth_base: { lat: 51.517991, lng: -0.081426 }, // London Liverpool Street Rail Station
  Liverpool_Street_elizabeth_top: { lat: 51.517991, lng: -0.081426 }, // London Liverpool Street Rail Station
  Liverpool_Street_nr: { lat: 51.517991, lng: -0.081426 }, // London Liverpool Street Rail Station
  London_Bridge: { lat: 51.505721, lng: -0.088873 }, // London Bridge Underground Station
  London_City_Airport: { lat: 51.503416, lng: 0.048739 }, // London City Airport DLR Station
  London_Fields: { lat: 51.541153, lng: -0.057753 }, // London Fields Rail Station
  Loughton: { lat: 51.641443, lng: 0.055476 }, // Loughton Underground Station
  Maida_Vale: { lat: 51.529777, lng: -0.185758 }, // Maida Vale Underground Station
  Maidenhead: { lat: 51.518669, lng: -0.72266 }, // Maidenhead Rail Station
  Manor_House: { lat: 51.570738, lng: -0.096118 }, // Manor House Underground Station
  Manor_Park: { lat: 51.552477, lng: 0.046342 }, // Manor Park Rail Station
  Mansion_House_circle: { lat: 51.512117, lng: -0.094009 }, // Mansion House Underground Station
  Mansion_House_district: { lat: 51.512117, lng: -0.094009 }, // Mansion House Underground Station
  Marble_Arch: { lat: 51.513424, lng: -0.158953 }, // Marble Arch Underground Station
  Maryland: { lat: 51.546081, lng: 0.005815 }, // Maryland Rail Station
  Marylebone: { lat: 51.522322, lng: -0.163207 }, // Marylebone Underground Station
  Mile_End: { lat: 51.525122, lng: -0.03364 }, // Mile End Underground Station
  Mill_Hill_East: { lat: 51.608229, lng: -0.209986 }, // Mill Hill East Underground Station
  Moor_Park: { lat: 51.629845, lng: -0.432454 }, // Moor Park Underground Station
  Moorgate_base: { lat: 51.518176, lng: -0.088322 }, // Moorgate Underground Station
  Moorgate_mid: { lat: 51.518176, lng: -0.088322 }, // Moorgate Underground Station
  Moorgate_top: { lat: 51.518176, lng: -0.088322 }, // Moorgate Underground Station
  Morden: { lat: 51.408874, lng: -0.192834 }, // Morden Road Tram Stop
  Mornington_Crescent: { lat: 51.534679, lng: -0.138789 }, // Mornington Crescent Underground Station
  Mudchute: { lat: 51.490704, lng: -0.014738 }, // Mudchute DLR Station
  Neasden: { lat: 51.553986, lng: -0.249837 }, // Neasden Underground Station
  New_Cross: { lat: 51.476344, lng: -0.032441 }, // New Cross ELL Rail Station
  New_Cross_Gate: { lat: 51.475128, lng: -0.040399 }, // New Cross Gate Rail Station
  Newbury_Park: { lat: 51.575726, lng: 0.090004 }, // Newbury Park Underground Station
  Nine_Elms: { lat: 51.479912, lng: -0.128476 }, // Nine Elms Underground Station
  North_Acton: { lat: 51.523524, lng: -0.259755 }, // North Acton Underground Station
  North_Ealing: { lat: 51.517505, lng: -0.288868 }, // North Ealing Underground Station
  North_Greenwich: { lat: 51.50047, lng: 0.004287 }, // North Greenwich Underground Station
  North_Harrow: { lat: 51.584872, lng: -0.362408 }, // North Harrow Underground Station
  North_Wembley_bakerloo: { lat: 51.562596, lng: -0.303984 }, // North Wembley Rail Station
  North_Wembley_overground: { lat: 51.562596, lng: -0.303984 }, // North Wembley Rail Station
  Northfields: { lat: 51.499319, lng: -0.314719 }, // Northfields Underground Station
  Northolt: { lat: 51.548236, lng: -0.368699 }, // Northolt Underground Station
  Northwick_Park: { lat: 51.578481, lng: -0.318056 }, // Northwick Park Underground Station
  Northwood: { lat: 51.611053, lng: -0.423829 }, // Northwood Underground Station
  Northwood_Hills: { lat: 51.600572, lng: -0.409464 }, // Northwood Hills Underground Station
  Norwood_Junction: { lat: 51.397019, lng: -0.075221 }, // Norwood Junction Rail Station
  Notting_Hill_Gate: { lat: 51.509128, lng: -0.196104 }, // Notting Hill Gate Underground Station
  Oakwood: { lat: 51.647726, lng: -0.132182 }, // Oakwood Underground Station
  Old_Oak_Common: { lat: 51.5194, lng: -0.2319 }, // Old Oak Common (under construction)
  Old_Street: { lat: 51.525864, lng: -0.08777 }, // Old Street Underground Station
  Osterley: { lat: 51.481274, lng: -0.352224 }, // Osterley Underground Station
  Oval: { lat: 51.48185, lng: -0.112439 }, // Oval Underground Station
  Oxford_Circus: { lat: 51.515224, lng: -0.141903 }, // Oxford Circus Underground Station
  Paddington_deep: { lat: 51.515996, lng: -0.176174 }, // London Paddington Rail Station
  Paddington_deep_base: { lat: 51.515996, lng: -0.176174 }, // London Paddington Rail Station
  Paddington_elizabeth: { lat: 51.515996, lng: -0.176174 }, // London Paddington Rail Station
  Paddington_elizabeth_base: { lat: 51.515996, lng: -0.176174 }, // London Paddington Rail Station
  Paddington_nr: { lat: 51.515996, lng: -0.176174 }, // London Paddington Rail Station
  Paddington_surface: { lat: 51.515996, lng: -0.176174 }, // London Paddington Rail Station
  Park_Royal: { lat: 51.527123, lng: -0.284341 }, // Park Royal Underground Station
  Parsons_Green: { lat: 51.475277, lng: -0.20117 }, // Parsons Green Underground Station
  Peckham_Rye: { lat: 51.470034, lng: -0.069414 }, // Peckham Rye Rail Station
  Penge_West: { lat: 51.417555, lng: -0.06084 }, // Penge West Rail Station
  Perivale: { lat: 51.536717, lng: -0.323446 }, // Perivale Underground Station
  Piccadilly_Circus: { lat: 51.51005, lng: -0.133798 }, // Piccadilly Circus Underground Station
  Pimlico: { lat: 51.489097, lng: -0.133761 }, // Pimlico Underground Station
  Pinner: { lat: 51.592901, lng: -0.381161 }, // Pinner Underground Station
  Plaistow_district: { lat: 51.531341, lng: 0.017451 }, // Plaistow Underground Station
  Plaistow_hnc: { lat: 51.531341, lng: 0.017451 }, // Plaistow Underground Station
  Pontoon_Dock: { lat: 51.502212, lng: 0.032115 }, // Pontoon Dock DLR Station
  Poplar: { lat: 51.507744, lng: -0.017384 }, // Poplar DLR Station
  Preston_Road: { lat: 51.571972, lng: -0.295107 }, // Preston Road Underground Station
  Prince_Regent: { lat: 51.509263, lng: 0.034158 }, // Prince Regent DLR Station
  Pudding_Mill_Lane: { lat: 51.534302, lng: -0.012755 }, // Pudding Mill Lane DLR Station
  Putney_Bridge: { lat: 51.468262, lng: -0.208731 }, // Putney Bridge Underground Station
  Queens_Park: { lat: 51.533966, lng: -0.204985 }, // Queens Park (London) Rail Station
  Queens_Road_Peckham: { lat: 51.473566, lng: -0.057313 }, // Queens Road Peckham Rail Station
  Queensbury: { lat: 51.594188, lng: -0.286219 }, // Queensbury Underground Station
  Queensway: { lat: 51.510312, lng: -0.187152 }, // Queensway Underground Station
  Ravenscourt_Park: { lat: 51.494122, lng: -0.235881 }, // Ravenscourt Park Underground Station
  Rayners_Lane: { lat: 51.575147, lng: -0.371127 }, // Rayners Lane Underground Station
  Reading: { lat: 51.458786, lng: -0.971863 }, // Reading Rail Station
  Rectory_Road: { lat: 51.558502, lng: -0.068267 }, // Rectory Road Rail Station
  Redbridge: { lat: 51.576243, lng: 0.04536 }, // Redbridge Underground Station
  Regents_Park: { lat: 51.523344, lng: -0.146444 }, // Regent's Park Underground Station
  Richmond: { lat: 51.463061, lng: -0.301558 }, // Richmond (London) Rail Station
  Rickmansworth: { lat: 51.640207, lng: -0.473703 }, // Rickmansworth Underground Station
  Roding_Valley: { lat: 51.617199, lng: 0.043647 }, // Roding Valley Underground Station
  Romford: { lat: 51.574829, lng: 0.183237 }, // Romford Rail Station
  Rotherhithe: { lat: 51.500817, lng: -0.052048 }, // Rotherhithe Rail Station
  Royal_Albert: { lat: 51.508357, lng: 0.045935 }, // Royal Albert DLR Station
  Royal_Oak_circle: { lat: 51.519113, lng: -0.188748 }, // Royal Oak Underground Station
  Royal_Oak_hnc: { lat: 51.519113, lng: -0.188748 }, // Royal Oak Underground Station
  Royal_Victoria: { lat: 51.509336, lng: 0.018497 }, // Royal Victoria DLR Station
  Ruislip_Gardens: { lat: 51.560736, lng: -0.41071 }, // Ruislip Gardens Underground Station
  Ruislip_Manor_metropolitan: { lat: 51.573202, lng: -0.412973 }, // Ruislip Manor Underground Station
  Ruislip_Manor_piccadilly: { lat: 51.573202, lng: -0.412973 }, // Ruislip Manor Underground Station
  Ruislip_metropolitan: { lat: 51.571354, lng: -0.421898 }, // Ruislip Underground Station
  Ruislip_piccadilly: { lat: 51.571354, lng: -0.421898 }, // Ruislip Underground Station
  Russell_Square: { lat: 51.523073, lng: -0.124285 }, // Russell Square Underground Station
  Seven_Kings: { lat: 51.564026, lng: 0.0971 }, // Seven Kings Rail Station
  Seven_Sisters: { lat: 51.582268, lng: -0.07527 }, // Seven Sisters Rail Station
  Shadwell: { lat: 51.511284, lng: -0.056934 }, // Shadwell Rail Station
  Shenfield: { lat: 51.630877, lng: 0.329851 }, // Shenfield Rail Station
  Shepherds_Bush_Market_circle: { lat: 51.505579, lng: -0.226375 }, // Shepherd's Bush Market Underground Station
  Shepherds_Bush_Market_hnc: { lat: 51.505579, lng: -0.226375 }, // Shepherd's Bush Market Underground Station
  Shepherds_Bush_nr: { lat: 51.505285, lng: -0.217654 }, // Shepherds Bush Rail Station
  Shepherds_Bush_tube: { lat: 51.504376, lng: -0.218813 }, // Shepherd's Bush (Central) Underground Station
  Shoreditch_High_Street: { lat: 51.523375, lng: -0.075246 }, // Shoreditch High Street Rail Station
  Silver_Street: { lat: 51.614688, lng: -0.06724 }, // Silver Street Rail Station
  Sloane_Square_circle: { lat: 51.49227, lng: -0.156377 }, // Sloane Square Underground Station
  Sloane_Square_district: { lat: 51.49227, lng: -0.156377 }, // Sloane Square Underground Station
  Slough: { lat: 51.51188, lng: -0.59151 }, // Slough Rail Station
  Snaresbrook: { lat: 51.580678, lng: 0.02144 }, // Snaresbrook Underground Station
  South_Acton: { lat: 51.499695, lng: -0.270157 }, // South Acton Rail Station
  South_Ealing: { lat: 51.501003, lng: -0.307424 }, // South Ealing Underground Station
  South_Greenford: { lat: 51.542424, lng: -0.34605 }, // South Greenford Rail Station
  South_Hampstead: { lat: 51.541432, lng: -0.178878 }, // South Hampstead Rail Station
  South_Harrow: { lat: 51.564888, lng: -0.352492 }, // South Harrow Underground Station
  South_Kensington: { lat: 51.494094, lng: -0.174138 }, // South Kensington Underground Station
  South_Kenton_bakerloo: { lat: 51.570214, lng: -0.308462 }, // South Kenton Rail Station
  South_Kenton_overground: { lat: 51.570214, lng: -0.308462 }, // South Kenton Rail Station
  South_Quay: { lat: 51.50005, lng: -0.01597 }, // South Quay DLR Station
  South_Ruislip: { lat: 51.556853, lng: -0.398915 }, // South Ruislip Underground Station
  South_Tottenham: { lat: 51.580372, lng: -0.072103 }, // South Tottenham Rail Station
  South_Wimbledon: { lat: 51.415309, lng: -0.192005 }, // South Wimbledon Underground Station
  South_Woodford: { lat: 51.591907, lng: 0.027338 }, // South Woodford Underground Station
  Southall: { lat: 51.505957, lng: -0.37861 }, // Southall Rail Station
  Southbury: { lat: 51.648705, lng: -0.052437 }, // Southbury Rail Station
  Southfields: { lat: 51.445073, lng: -0.206602 }, // Southfields Underground Station
  Southgate: { lat: 51.632315, lng: -0.127816 }, // Southgate Underground Station
  Southwark: { lat: 51.50427, lng: -0.105331 }, // Southwark Underground Station
  St_James_Street: { lat: 51.580981, lng: -0.032918 }, // St James Street (London) Rail Station
  St_Jamess_Park_circle: { lat: 51.499544, lng: -0.133608 }, // St. James's Park Underground Station
  St_Jamess_Park_district: { lat: 51.499544, lng: -0.133608 }, // St. James's Park Underground Station
  St_Johns_Wood: { lat: 51.534521, lng: -0.173948 }, // St. John's Wood Underground Station
  St_Pauls: { lat: 51.514936, lng: -0.097567 }, // St. Paul's Underground Station
  Stamford_Brook: { lat: 51.494917, lng: -0.245704 }, // Stamford Brook Underground Station
  Stamford_Hill: { lat: 51.574467, lng: -0.076682 }, // Stamford Hill Rail Station
  Stanmore: { lat: 51.619839, lng: -0.303266 }, // Stanmore Underground Station
  Star_Lane: { lat: 51.520786, lng: 0.004156 }, // Star Lane DLR Station
  Stepney_Green_district: { lat: 51.521858, lng: -0.046596 }, // Stepney Green Underground Station
  Stepney_Green_hnc: { lat: 51.521858, lng: -0.046596 }, // Stepney Green Underground Station
  Stockwell: { lat: 51.472184, lng: -0.122644 }, // Stockwell Underground Station
  Stoke_Newington: { lat: 51.565233, lng: -0.072887 }, // Stoke Newington Rail Station
  Stonebridge_Park_bakerloo: { lat: 51.544111, lng: -0.275828 }, // Stonebridge Park Rail Station
  Stonebridge_Park_overground: { lat: 51.544111, lng: -0.275828 }, // Stonebridge Park Rail Station
  Stratford: { lat: 51.541895, lng: -0.003397 }, // Stratford (London) Rail Station
  Stratford_High_Street: { lat: 51.538196, lng: -0.001078 }, // Stratford High Street DLR Station
  Stratford_International: { lat: 51.545265, lng: -0.009638 }, // Stratford International DLR Station
  Sudbury_Hill: { lat: 51.556946, lng: -0.336435 }, // Sudbury Hill Underground Station
  Sudbury_Town: { lat: 51.550815, lng: -0.315745 }, // Sudbury Town Underground Station
  Surrey_Canal: { lat: 51.493196, lng: -0.047519 }, // Surrey Canal (likely Surrey Quays)
  Surrey_Quays: { lat: 51.493196, lng: -0.047519 }, // Surrey Quays Rail Station
  Swiss_Cottage: { lat: 51.543681, lng: -0.174894 }, // Swiss Cottage Underground Station
  Sydenham: { lat: 51.427248, lng: -0.054244 }, // Sydenham Rail Station
  Taplow: { lat: 51.523562, lng: -0.68137 }, // Taplow Rail Station
  Temple_circle: { lat: 51.511006, lng: -0.11426 }, // Temple Underground Station
  Temple_district: { lat: 51.511006, lng: -0.11426 }, // Temple Underground Station
  Theobalds_Grove: { lat: 51.692457, lng: -0.034831 }, // Theobalds Grove Rail Station
  Theydon_Bois: { lat: 51.671759, lng: 0.103085 }, // Theydon Bois Underground Station
  Tooting_Bec: { lat: 51.435678, lng: -0.159736 }, // Tooting Bec Underground Station
  Tooting_Broadway: { lat: 51.42763, lng: -0.168374 }, // Tooting Broadway Underground Station
  Tottenham_Court_Road_cr: { lat: 51.515974, lng: -0.130241 }, // Tottenham Court Road
  Tottenham_Hale: { lat: 51.588108, lng: -0.060241 }, // Tottenham Hale Underground Station
  Totteridge_And_Whetstone: { lat: 51.630597, lng: -0.17921 }, // Totteridge & Whetstone Underground Station
  Tower_Gateway: { lat: 51.510617, lng: -0.074818 }, // Tower Gateway DLR Station
  Tower_Hill: { lat: 51.509971, lng: -0.076546 }, // Tower Hill Underground Station
  Tufnell_Park: { lat: 51.556822, lng: -0.138433 }, // Tufnell Park Underground Station
  Turkey_Street: { lat: 51.672628, lng: -0.047217 }, // Turkey Street Rail Station
  Turnham_Green_district: { lat: 51.495148, lng: -0.254555 }, // Turnham Green Underground Station
  Turnham_Green_piccadilly: { lat: 51.495148, lng: -0.254555 }, // Turnham Green Underground Station
  Turnpike_Lane: { lat: 51.590272, lng: -0.102953 }, // Turnpike Lane Underground Station
  Twyford: { lat: 51.475534, lng: -0.863293 }, // Twyford Rail Station
  Upminster: { lat: 51.559018, lng: 0.25088 }, // Upminster Rail Station
  Upminster_Bridge: { lat: 51.55856, lng: 0.235809 }, // Upminster Bridge Underground Station
  Upney: { lat: 51.538372, lng: 0.10153 }, // Upney Underground Station
  Upper_Holloway: { lat: 51.563631, lng: -0.129513 }, // Upper Holloway Rail Station
  Upton_Park_district: { lat: 51.53534, lng: 0.035263 }, // Upton Park Underground Station
  Upton_Park_hnc: { lat: 51.53534, lng: 0.035263 }, // Upton Park Underground Station
  Uxbridge_metropolitan: { lat: 51.546565, lng: -0.477949 }, // Uxbridge Underground Station
  Uxbridge_piccadilly: { lat: 51.546565, lng: -0.477949 }, // Uxbridge Underground Station
  Vauxhall: { lat: 51.485743, lng: -0.124204 }, // Vauxhall Underground Station
  Victoria: { lat: 51.496359, lng: -0.143102 }, // Victoria Underground Station
  Walthamstow_Central: { lat: 51.582919, lng: -0.019815 }, // Walthamstow Central Rail Station
  Walthamstow_Queens_Road: { lat: 51.581503, lng: -0.023846 }, // Walthamstow Queens Road Rail Station
  Wandsworth_Road: { lat: 51.470216, lng: -0.13852 }, // Wandsworth Road Rail Station
  Wanstead: { lat: 51.575501, lng: 0.028527 }, // Wanstead Underground Station
  Wanstead_Park: { lat: 51.551693, lng: 0.026213 }, // Wanstead Park Rail Station
  Wapping: { lat: 51.504388, lng: -0.055931 }, // Wapping Rail Station
  Warren_Street: { lat: 51.524951, lng: -0.138321 }, // Warren Street Underground Station
  Warwick_Avenue: { lat: 51.523263, lng: -0.183783 }, // Warwick Avenue Underground Station
  Waterloo: { lat: 51.503299, lng: -0.11478 }, // Waterloo Underground Station
  Watford: { lat: 51.657446, lng: -0.417377 }, // Watford Underground Station
  Watford_High_Street: { lat: 51.652655, lng: -0.391711 }, // Watford High Street Rail Station
  Watford_Junction: { lat: 51.663529, lng: -0.396517 }, // Watford Junction Rail Station
  Wembley_Central: { lat: 51.552325, lng: -0.296433 }, // Wembley Central Rail Station
  Wembley_Park: { lat: 51.563198, lng: -0.279262 }, // Wembley Park Underground Station
  West_Acton: { lat: 51.518001, lng: -0.28098 }, // West Acton Underground Station
  West_Brompton: { lat: 51.487061, lng: -0.195593 }, // West Brompton Rail Station
  West_Croydon: { lat: 51.378971, lng: -0.101701 }, // West Croydon Tram Stop
  West_Drayton: { lat: 51.510055, lng: -0.472234 }, // West Drayton Rail Station
  West_Ealing: { lat: 51.513506, lng: -0.320133 }, // West Ealing Rail Station
  West_Finchley: { lat: 51.609426, lng: -0.188362 }, // West Finchley Underground Station
  West_Ham: { lat: 51.527894, lng: 0.004482 }, // West Ham DLR Station
  West_Hampstead: { lat: 51.547468, lng: -0.191185 }, // West Hampstead Rail Station
  West_Harrow: { lat: 51.57971, lng: -0.3534 }, // West Harrow Underground Station
  West_India_Quay: { lat: 51.50703, lng: -0.020311 }, // West India Quay DLR Station
  West_Kensington: { lat: 51.490459, lng: -0.206636 }, // West Kensington Underground Station
  West_Ruislip: { lat: 51.569688, lng: -0.437886 }, // West Ruislip Underground Station
  West_Silvertown: { lat: 51.502838, lng: 0.02246 }, // West Silvertown DLR Station
  Westbourne_Park_circle: { lat: 51.52111, lng: -0.201065 }, // Westbourne Park Underground Station
  Westbourne_Park_hnc: { lat: 51.52111, lng: -0.201065 }, // Westbourne Park Underground Station
  Westferry: { lat: 51.509431, lng: -0.02675 }, // Westferry DLR Station
  Westminster: { lat: 51.50132, lng: -0.124861 }, // Westminster Underground Station
  White_City: { lat: 51.511959, lng: -0.224297 }, // White City Underground Station
  White_Hart_Lane: { lat: 51.605037, lng: -0.070914 }, // White Hart Lane Rail Station
  Whitechapel: { lat: 51.51943, lng: -0.060191 }, // Whitechapel
  Willesden_Green: { lat: 51.549146, lng: -0.221537 }, // Willesden Green Underground Station
  Willesden_Junction: { lat: 51.532497, lng: -0.244548 }, // Willesden Junction Rail Station
  Wimbledon: { lat: 51.421051, lng: -0.205816 }, // Wimbledon Tram Stop
  Wimbledon_Park: { lat: 51.434573, lng: -0.199719 }, // Wimbledon Park Underground Station
  Wood_Green: { lat: 51.597479, lng: -0.109886 }, // Wood Green Underground Station
  Wood_Lane: { lat: 51.509669, lng: -0.22453 }, // Wood Lane Underground Station
  Wood_Street: { lat: 51.58658, lng: -0.002405 }, // Wood Street Rail Station
  Woodford: { lat: 51.606899, lng: 0.03397 }, // Woodford Underground Station
  Woodgrange_Park: { lat: 51.549264, lng: 0.044423 }, // Woodgrange Park Rail Station
  Woodside_Park: { lat: 51.3871, lng: -0.065361 }, // Woodside Tram Stop
  Woolwich: { lat: 51.49119, lng: 0.07072 }, // Woolwich
  Woolwich_Arsenal: { lat: 51.490009, lng: 0.069127 }, // Woolwich Arsenal DLR Station
};

/**
 * Get geographic coordinates for a station by its ID.
 * Returns null if coordinates are not available.
 */
export function getStationGeo(stationId: string): StationGeo | null {
  return stationGeo[stationId] || null;
}

/**
 * Get all station IDs that have geographic coordinates.
 */
export function getStationsWithGeo(): string[] {
  return Object.keys(stationGeo);
}
