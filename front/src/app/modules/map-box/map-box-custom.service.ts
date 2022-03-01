import {Injectable, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MapBoxCustomService {
  @Output() result = new EventEmitter<any>();

  constructor() {
  }

  public countries = [
    {
      "label": "Afghanistan",
      "value": "AF",
      "alpha3": "AFG",
      "number": "004"
    },
    {
      "label": "Åland Islands",
      "value": "AX",
      "alpha3": "ALA",
      "number": "248"
    },
    {
      "label": "Albania",
      "value": "AL",
      "alpha3": "ALB",
      "number": "008"
    },
    {
      "label": "Algeria",
      "value": "DZ",
      "alpha3": "DZA",
      "number": "012"
    },
    {
      "label": "American Samoa",
      "value": "AS",
      "alpha3": "ASM",
      "number": "016"
    },
    {
      "label": "Andorra",
      "value": "AD",
      "alpha3": "AND",
      "number": "020"
    },
    {
      "label": "Angola",
      "value": "AO",
      "alpha3": "AGO",
      "number": "024"
    },
    {
      "label": "Anguilla",
      "value": "AI",
      "alpha3": "AIA",
      "number": "660"
    },
    {
      "label": "Antarctica",
      "value": "AQ",
      "alpha3": "ATA",
      "number": "010"
    },
    {
      "label": "Antigua and Barbuda",
      "value": "AG",
      "alpha3": "ATG",
      "number": "028"
    },
    {
      "label": "Argentina",
      "value": "AR",
      "alpha3": "ARG",
      "number": "032"
    },
    {
      "label": "Armenia",
      "value": "AM",
      "alpha3": "ARM",
      "number": "051"
    },
    {
      "label": "Aruba",
      "value": "AW",
      "alpha3": "ABW",
      "number": "533"
    },
    {
      "label": "Australia",
      "value": "AU",
      "alpha3": "AUS",
      "number": "036"
    },
    {
      "label": "Austria",
      "value": "AT",
      "alpha3": "AUT",
      "number": "040"
    },
    {
      "label": "Azerbaijan",
      "value": "AZ",
      "alpha3": "AZE",
      "number": "031"
    },
    {
      "label": "Bahamas",
      "value": "BS",
      "alpha3": "BHS",
      "number": "044"
    },
    {
      "label": "Bahrain",
      "value": "BH",
      "alpha3": "BHR",
      "number": "048"
    },
    {
      "label": "Bangladesh",
      "value": "BD",
      "alpha3": "BGD",
      "number": "050"
    },
    {
      "label": "Barbados",
      "value": "BB",
      "alpha3": "BRB",
      "number": "052"
    },
    {
      "label": "Belarus",
      "value": "BY",
      "alpha3": "BLR",
      "number": "112"
    },
    {
      "label": "Belgium",
      "value": "BE",
      "alpha3": "BEL",
      "number": "056"
    },
    {
      "label": "Belize",
      "value": "BZ",
      "alpha3": "BLZ",
      "number": "084"
    },
    {
      "label": "Benin",
      "value": "BJ",
      "alpha3": "BEN",
      "number": "204"
    },
    {
      "label": "Bermuda",
      "value": "BM",
      "alpha3": "BMU",
      "number": "060"
    },
    {
      "label": "Bhutan",
      "value": "BT",
      "alpha3": "BTN",
      "number": "064"
    },
    {
      "label": "Bolivia (Plurinational State of)",
      "value": "BO",
      "alpha3": "BOL",
      "number": "068"
    },
    {
      "label": "Bonaire, Sint Eustatius and Saba",
      "value": "BQ",
      "alpha3": "BES",
      "number": "535"
    },
    {
      "label": "Bosnia and Herzegovina",
      "value": "BA",
      "alpha3": "BIH",
      "number": "070"
    },
    {
      "label": "Botswana",
      "value": "BW",
      "alpha3": "BWA",
      "number": "072"
    },
    {
      "label": "Bouvet Island",
      "value": "BV",
      "alpha3": "BVT",
      "number": "074"
    },
    {
      "label": "Brazil",
      "value": "BR",
      "alpha3": "BRA",
      "number": "076"
    },
    {
      "label": "British Indian Ocean Territory",
      "value": "IO",
      "alpha3": "IOT",
      "number": "086"
    },
    {
      "label": "Brunei Darussalam",
      "value": "BN",
      "alpha3": "BRN",
      "number": "096"
    },
    {
      "label": "Bulgaria",
      "value": "BG",
      "alpha3": "BGR",
      "number": "100"
    },
    {
      "label": "Burkina Faso",
      "value": "BF",
      "alpha3": "BFA",
      "number": "854"
    },
    {
      "label": "Burundi",
      "value": "BI",
      "alpha3": "BDI",
      "number": "108"
    },
    {
      "label": "Cambodia",
      "value": "KH",
      "alpha3": "KHM",
      "number": "116"
    },
    {
      "label": "Cameroon",
      "value": "CM",
      "alpha3": "CMR",
      "number": "120"
    },
    {
      "label": "Canada",
      "value": "CA",
      "alpha3": "CAN",
      "number": "124"
    },
    {
      "label": "Cape Verde",
      "value": "CV",
      "alpha3": "CPV",
      "number": "132"
    },
    {
      "label": "Cayman Islands",
      "value": "KY",
      "alpha3": "CYM",
      "number": "136"
    },
    {
      "label": "Central African Republic",
      "value": "CF",
      "alpha3": "CAF",
      "number": "140"
    },
    {
      "label": "Chad",
      "value": "TD",
      "alpha3": "TCD",
      "number": "148"
    },
    {
      "label": "Chile",
      "value": "CL",
      "alpha3": "CHL",
      "number": "152"
    },
    {
      "label": "China",
      "value": "CN",
      "alpha3": "CHN",
      "number": "156"
    },
    {
      "label": "Christmas Island",
      "value": "CX",
      "alpha3": "CXR",
      "number": "162"
    },
    {
      "label": "Cocos (Keeling) Islands",
      "value": "CC",
      "alpha3": "CCK",
      "number": "166"
    },
    {
      "label": "Colombia",
      "value": "CO",
      "alpha3": "COL",
      "number": "170"
    },
    {
      "label": "Comoros",
      "value": "KM",
      "alpha3": "COM",
      "number": "174"
    },
    {
      "label": "Republic of the Congo",
      "value": "CG",
      "alpha3": "COG",
      "number": "178"
    },
    {
      "label": "Democratic Republic of the Congo",
      "value": "CD",
      "alpha3": "COD",
      "number": "180"
    },
    {
      "label": "Cook Islands",
      "value": "CK",
      "alpha3": "COK",
      "number": "184"
    },
    {
      "label": "Costa Rica",
      "value": "CR",
      "alpha3": "CRI",
      "number": "188"
    },
    {
      "label": "Côte d'Ivoire",
      "value": "CI",
      "alpha3": "CIV",
      "number": "384"
    },
    {
      "label": "Croatia",
      "value": "HR",
      "alpha3": "HRV",
      "number": "191"
    },
    {
      "label": "Cuba",
      "value": "CU",
      "alpha3": "CUB",
      "number": "192"
    },
    {
      "label": "Curaçao",
      "value": "CW",
      "alpha3": "CUW",
      "number": "531"
    },
    {
      "label": "Cyprus",
      "value": "CY",
      "alpha3": "CYP",
      "number": "196"
    },
    {
      "label": "Czech Republic",
      "value": "CZ",
      "alpha3": "CZE",
      "number": "203"
    },
    {
      "label": "Denmark",
      "value": "DK",
      "alpha3": "DNK",
      "number": "208"
    },
    {
      "label": "Djibouti",
      "value": "DJ",
      "alpha3": "DJI",
      "number": "262"
    },
    {
      "label": "Dominica",
      "value": "DM",
      "alpha3": "DMA",
      "number": "212"
    },
    {
      "label": "Dominican Republic",
      "value": "DO",
      "alpha3": "DOM",
      "number": "214"
    },
    {
      "label": "Ecuador",
      "value": "EC",
      "alpha3": "ECU",
      "number": "218"
    },
    {
      "label": "Egypt",
      "value": "EG",
      "alpha3": "EGY",
      "number": "818"
    },
    {
      "label": "El Salvador",
      "value": "SV",
      "alpha3": "SLV",
      "number": "222"
    },
    {
      "label": "Equatorial Guinea",
      "value": "GQ",
      "alpha3": "GNQ",
      "number": "226"
    },
    {
      "label": "Eritrea",
      "value": "ER",
      "alpha3": "ERI",
      "number": "232"
    },
    {
      "label": "Estonia",
      "value": "EE",
      "alpha3": "EST",
      "number": "233"
    },
    {
      "label": "Ethiopia",
      "value": "ET",
      "alpha3": "ETH",
      "number": "231"
    },
    {
      "label": "Falkland Islands (Malvinas)",
      "value": "FK",
      "alpha3": "FLK",
      "number": "238"
    },
    {
      "label": "Faroe Islands",
      "value": "FO",
      "alpha3": "FRO",
      "number": "234"
    },
    {
      "label": "Fiji",
      "value": "FJ",
      "alpha3": "FJI",
      "number": "242"
    },
    {
      "label": "Finland",
      "value": "FI",
      "alpha3": "FIN",
      "number": "246"
    },
    {
      "label": "France",
      "value": "FR",
      "alpha3": "FRA",
      "number": "250"
    },
    {
      "label": "French Guiana",
      "value": "GF",
      "alpha3": "GUF",
      "number": "254"
    },
    {
      "label": "French Polynesia",
      "value": "PF",
      "alpha3": "PYF",
      "number": "258"
    },
    {
      "label": "French Southern Territories",
      "value": "TF",
      "alpha3": "ATF",
      "number": "260"
    },
    {
      "label": "Gabon",
      "value": "GA",
      "alpha3": "GAB",
      "number": "266"
    },
    {
      "label": "Gambia",
      "value": "GM",
      "alpha3": "GMB",
      "number": "270"
    },
    {
      "label": "Georgia",
      "value": "GE",
      "alpha3": "GEO",
      "number": "268"
    },
    {
      "label": "Germany",
      "value": "DE",
      "alpha3": "DEU",
      "number": "276"
    },
    {
      "label": "Ghana",
      "value": "GH",
      "alpha3": "GHA",
      "number": "288"
    },
    {
      "label": "Gibraltar",
      "value": "GI",
      "alpha3": "GIB",
      "number": "292"
    },
    {
      "label": "Greece",
      "value": "GR",
      "alpha3": "GRC",
      "number": "300"
    },
    {
      "label": "Greenland",
      "value": "GL",
      "alpha3": "GRL",
      "number": "304"
    },
    {
      "label": "Grenada",
      "value": "GD",
      "alpha3": "GRD",
      "number": "308"
    },
    {
      "label": "Guadeloupe",
      "value": "GP",
      "alpha3": "GLP",
      "number": "312"
    },
    {
      "label": "Guam",
      "value": "GU",
      "alpha3": "GUM",
      "number": "316"
    },
    {
      "label": "Guatemala",
      "value": "GT",
      "alpha3": "GTM",
      "number": "320"
    },
    {
      "label": "Guernsey",
      "value": "GG",
      "alpha3": "GGY",
      "number": "831"
    },
    {
      "label": "Guinea",
      "value": "GN",
      "alpha3": "GIN",
      "number": "324"
    },
    {
      "label": "Guinea-Bissau",
      "value": "GW",
      "alpha3": "GNB",
      "number": "624"
    },
    {
      "label": "Guyana",
      "value": "GY",
      "alpha3": "GUY",
      "number": "328"
    },
    {
      "label": "Haiti",
      "value": "HT",
      "alpha3": "HTI",
      "number": "332"
    },
    {
      "label": "Heard Island and McDonald Islands",
      "value": "HM",
      "alpha3": "HMD",
      "number": "334"
    },
    {
      "label": "Vatican City",
      "value": "VA",
      "alpha3": "VAT",
      "number": "336"
    },
    {
      "label": "Honduras",
      "value": "HN",
      "alpha3": "HND",
      "number": "340"
    },
    {
      "label": "Hong Kong",
      "value": "HK",
      "alpha3": "HKG",
      "number": "344"
    },
    {
      "label": "Hungary",
      "value": "HU",
      "alpha3": "HUN",
      "number": "348"
    },
    {
      "label": "Iceland",
      "value": "IS",
      "alpha3": "ISL",
      "number": "352"
    },
    {
      "label": "India",
      "value": "IN",
      "alpha3": "IND",
      "number": "356"
    },
    {
      "label": "Indonesia",
      "value": "ID",
      "alpha3": "IDN",
      "number": "360"
    },
    {
      "label": "Iran (Islamic Republic of)",
      "value": "IR",
      "alpha3": "IRN",
      "number": "364"
    },
    {
      "label": "Iraq",
      "value": "IQ",
      "alpha3": "IRQ",
      "number": "368"
    },
    {
      "label": "Ireland",
      "value": "IE",
      "alpha3": "IRL",
      "number": "372"
    },
    {
      "label": "Isle of Man",
      "value": "IM",
      "alpha3": "IMN",
      "number": "833"
    },
    {
      "label": "Israel",
      "value": "IL",
      "alpha3": "ISR",
      "number": "376"
    },
    {
      "label": "Italy",
      "value": "IT",
      "alpha3": "ITA",
      "number": "380"
    },
    {
      "label": "Jamaica",
      "value": "JM",
      "alpha3": "JAM",
      "number": "388"
    },
    {
      "label": "Japan",
      "value": "JP",
      "alpha3": "JPN",
      "number": "392"
    },
    {
      "label": "Jersey",
      "value": "JE",
      "alpha3": "JEY",
      "number": "832"
    },
    {
      "label": "Jordan",
      "value": "JO",
      "alpha3": "JOR",
      "number": "400"
    },
    {
      "label": "Kazakhstan",
      "value": "KZ",
      "alpha3": "KAZ",
      "number": "398"
    },
    {
      "label": "Kenya",
      "value": "KE",
      "alpha3": "KEN",
      "number": "404"
    },
    {
      "label": "Kiribati",
      "value": "KI",
      "alpha3": "KIR",
      "number": "296"
    },
    {
      "label": "North Korea",
      "value": "KP",
      "alpha3": "PRK",
      "number": "408"
    },
    {
      "label": "South Korea",
      "value": "KR",
      "alpha3": "KOR",
      "number": "410"
    },
    {
      "label": "Kuwait",
      "value": "KW",
      "alpha3": "KWT",
      "number": "414"
    },
    {
      "label": "Kyrgyzstan",
      "value": "KG",
      "alpha3": "KGZ",
      "number": "417"
    },
    {
      "label": "Laos",
      "value": "LA",
      "alpha3": "LAO",
      "number": "418"
    },
    {
      "label": "Latvia",
      "value": "LV",
      "alpha3": "LVA",
      "number": "428"
    },
    {
      "label": "Lebanon",
      "value": "LB",
      "alpha3": "LBN",
      "number": "422"
    },
    {
      "label": "Lesotho",
      "value": "LS",
      "alpha3": "LSO",
      "number": "426"
    },
    {
      "label": "Liberia",
      "value": "LR",
      "alpha3": "LBR",
      "number": "430"
    },
    {
      "label": "Libya",
      "value": "LY",
      "alpha3": "LBY",
      "number": "434"
    },
    {
      "label": "Liechtenstein",
      "value": "LI",
      "alpha3": "LIE",
      "number": "438"
    },
    {
      "label": "Lithuania",
      "value": "LT",
      "alpha3": "LTU",
      "number": "440"
    },
    {
      "label": "Luxembourg",
      "value": "LU",
      "alpha3": "LUX",
      "number": "442"
    },
    {
      "label": "Macao",
      "value": "MO",
      "alpha3": "MAC",
      "number": "446"
    },
    {
      "label": "Macedonia (the former Yugoslav Republic of)",
      "value": "MK",
      "alpha3": "MKD",
      "number": "807"
    },
    {
      "label": "Madagascar",
      "value": "MG",
      "alpha3": "MDG",
      "number": "450"
    },
    {
      "label": "Malawi",
      "value": "MW",
      "alpha3": "MWI",
      "number": "454"
    },
    {
      "label": "Malaysia",
      "value": "MY",
      "alpha3": "MYS",
      "number": "458"
    },
    {
      "label": "Maldives",
      "value": "MV",
      "alpha3": "MDV",
      "number": "462"
    },
    {
      "label": "Mali",
      "value": "ML",
      "alpha3": "MLI",
      "number": "466"
    },
    {
      "label": "Malta",
      "value": "MT",
      "alpha3": "MLT",
      "number": "470"
    },
    {
      "label": "Marshall Islands",
      "value": "MH",
      "alpha3": "MHL",
      "number": "584"
    },
    {
      "label": "Martinique",
      "value": "MQ",
      "alpha3": "MTQ",
      "number": "474"
    },
    {
      "label": "Mauritania",
      "value": "MR",
      "alpha3": "MRT",
      "number": "478"
    },
    {
      "label": "Mauritius",
      "value": "MU",
      "alpha3": "MUS",
      "number": "480"
    },
    {
      "label": "Mayotte",
      "value": "YT",
      "alpha3": "MYT",
      "number": "175"
    },
    {
      "label": "Mexico",
      "value": "MX",
      "alpha3": "MEX",
      "number": "484"
    },
    {
      "label": "Federated States of Micronesia",
      "value": "FM",
      "alpha3": "FSM",
      "number": "583"
    },
    {
      "label": "Moldova (Republic of)",
      "value": "MD",
      "alpha3": "MDA",
      "number": "498"
    },
    {
      "label": "Monaco",
      "value": "MC",
      "alpha3": "MCO",
      "number": "492"
    },
    {
      "label": "Mongolia",
      "value": "MN",
      "alpha3": "MNG",
      "number": "496"
    },
    {
      "label": "Montenegro",
      "value": "ME",
      "alpha3": "MNE",
      "number": "499"
    },
    {
      "label": "Montserrat",
      "value": "MS",
      "alpha3": "MSR",
      "number": "500"
    },
    {
      "label": "Morocco",
      "value": "MA",
      "alpha3": "MAR",
      "number": "504"
    },
    {
      "label": "Mozambique",
      "value": "MZ",
      "alpha3": "MOZ",
      "number": "508"
    },
    {
      "label": "Myanmar",
      "value": "MM",
      "alpha3": "MMR",
      "number": "104"
    },
    {
      "label": "Namibia",
      "value": "NA",
      "alpha3": "NAM",
      "number": "516"
    },
    {
      "label": "Nauru",
      "value": "NR",
      "alpha3": "NRU",
      "number": "520"
    },
    {
      "label": "Nepal",
      "value": "NP",
      "alpha3": "NPL",
      "number": "524"
    },
    {
      "label": "Netherlands",
      "value": "NL",
      "alpha3": "NLD",
      "number": "528"
    },
    {
      "label": "New Caledonia",
      "value": "NC",
      "alpha3": "NCL",
      "number": "540"
    },
    {
      "label": "New Zealand",
      "value": "NZ",
      "alpha3": "NZL",
      "number": "554"
    },
    {
      "label": "Nicaragua",
      "value": "NI",
      "alpha3": "NIC",
      "number": "558"
    },
    {
      "label": "Niger",
      "value": "NE",
      "alpha3": "NER",
      "number": "562"
    },
    {
      "label": "Nigeria",
      "value": "NG",
      "alpha3": "NGA",
      "number": "566"
    },
    {
      "label": "Niue",
      "value": "NU",
      "alpha3": "NIU",
      "number": "570"
    },
    {
      "label": "Norfolk Island",
      "value": "NF",
      "alpha3": "NFK",
      "number": "574"
    },
    {
      "label": "Northern Mariana Islands",
      "value": "MP",
      "alpha3": "MNP",
      "number": "580"
    },
    {
      "label": "Norway",
      "value": "NO",
      "alpha3": "NOR",
      "number": "578"
    },
    {
      "label": "Oman",
      "value": "OM",
      "alpha3": "OMN",
      "number": "512"
    },
    {
      "label": "Pakistan",
      "value": "PK",
      "alpha3": "PAK",
      "number": "586"
    },
    {
      "label": "Palau",
      "value": "PW",
      "alpha3": "PLW",
      "number": "585"
    },
    {
      "label": "State of Palestine",
      "value": "PS",
      "alpha3": "PSE",
      "number": "275"
    },
    {
      "label": "Panama",
      "value": "PA",
      "alpha3": "PAN",
      "number": "591"
    },
    {
      "label": "Papua New Guinea",
      "value": "PG",
      "alpha3": "PNG",
      "number": "598"
    },
    {
      "label": "Paraguay",
      "value": "PY",
      "alpha3": "PRY",
      "number": "600"
    },
    {
      "label": "Peru",
      "value": "PE",
      "alpha3": "PER",
      "number": "604"
    },
    {
      "label": "Philippines",
      "value": "PH",
      "alpha3": "PHL",
      "number": "608"
    },
    {
      "label": "Pitcairn Islands",
      "value": "PN",
      "alpha3": "PCN",
      "number": "612"
    },
    {
      "label": "Poland",
      "value": "PL",
      "alpha3": "POL",
      "number": "616"
    },
    {
      "label": "Portugal",
      "value": "PT",
      "alpha3": "PRT",
      "number": "620"
    },
    {
      "label": "Puerto Rico",
      "value": "PR",
      "alpha3": "PRI",
      "number": "630"
    },
    {
      "label": "Qatar",
      "value": "QA",
      "alpha3": "QAT",
      "number": "634"
    },
    {
      "label": "Réunion",
      "value": "RE",
      "alpha3": "REU",
      "number": "638"
    },
    {
      "label": "Romania",
      "value": "RO",
      "alpha3": "ROU",
      "number": "642"
    },
    {
      "label": "Russia",
      "value": "RU",
      "alpha3": "RUS",
      "number": "643"
    },
    {
      "label": "Rwanda",
      "value": "RW",
      "alpha3": "RWA",
      "number": "646"
    },
    {
      "label": "Saint Barthélemy",
      "value": "BL",
      "alpha3": "BLM",
      "number": "652"
    },
    {
      "label": "Saint Helena, Ascension and Tristan da Cunha",
      "value": "SH",
      "alpha3": "SHN",
      "number": "654"
    },
    {
      "label": "Saint Kitts and Nevis",
      "value": "KN",
      "alpha3": "KNA",
      "number": "659"
    },
    {
      "label": "Saint Lucia",
      "value": "LC",
      "alpha3": "LCA",
      "number": "662"
    },
    {
      "label": "Saint Martin (French part)",
      "value": "MF",
      "alpha3": "MAF",
      "number": "663"
    },
    {
      "label": "Saint Pierre and Miquelon",
      "value": "PM",
      "alpha3": "SPM",
      "number": "666"
    },
    {
      "label": "Saint Vincent and the Grenadines",
      "value": "VC",
      "alpha3": "VCT",
      "number": "670"
    },
    {
      "label": "Samoa",
      "value": "WS",
      "alpha3": "WSM",
      "number": "882"
    },
    {
      "label": "San Marino",
      "value": "SM",
      "alpha3": "SMR",
      "number": "674"
    },
    {
      "label": "Sao Tome and Principe",
      "value": "ST",
      "alpha3": "STP",
      "number": "678"
    },
    {
      "label": "Saudi Arabia",
      "value": "SA",
      "alpha3": "SAU",
      "number": "682"
    },
    {
      "label": "Senegal",
      "value": "SN",
      "alpha3": "SEN",
      "number": "686"
    },
    {
      "label": "Serbia",
      "value": "RS",
      "alpha3": "SRB",
      "number": "688"
    },
    {
      "label": "Seychelles",
      "value": "SC",
      "alpha3": "SYC",
      "number": "690"
    },
    {
      "label": "Sierra Leone",
      "value": "SL",
      "alpha3": "SLE",
      "number": "694"
    },
    {
      "label": "Singapore",
      "value": "SG",
      "alpha3": "SGP",
      "number": "702"
    },
    {
      "label": "Sint Maarten (Dutch part)",
      "value": "SX",
      "alpha3": "SXM",
      "number": "534"
    },
    {
      "label": "Slovakia",
      "value": "SK",
      "alpha3": "SVK",
      "number": "703"
    },
    {
      "label": "Slovenia",
      "value": "SI",
      "alpha3": "SVN",
      "number": "705"
    },
    {
      "label": "Solomon Islands",
      "value": "SB",
      "alpha3": "SLB",
      "number": "090"
    },
    {
      "label": "Somalia",
      "value": "SO",
      "alpha3": "SOM",
      "number": "706"
    },
    {
      "label": "South Africa",
      "value": "ZA",
      "alpha3": "ZAF",
      "number": "710"
    },
    {
      "label": "South Georgia and the South Sandwich Islands",
      "value": "GS",
      "alpha3": "SGS",
      "number": "239"
    },
    {
      "label": "South Sudan",
      "value": "SS",
      "alpha3": "SSD",
      "number": "728"
    },
    {
      "label": "Spain",
      "value": "ES",
      "alpha3": "ESP",
      "number": "724"
    },
    {
      "label": "Sri Lanka",
      "value": "LK",
      "alpha3": "LKA",
      "number": "144"
    },
    {
      "label": "Sudan",
      "value": "SD",
      "alpha3": "SDN",
      "number": "729"
    },
    {
      "label": "Surilabel",
      "value": "SR",
      "alpha3": "SUR",
      "number": "740"
    },
    {
      "label": "Svalbard and Jan Mayen",
      "value": "SJ",
      "alpha3": "SJM",
      "number": "744"
    },
    {
      "label": "Swaziland",
      "value": "SZ",
      "alpha3": "SWZ",
      "number": "748"
    },
    {
      "label": "Sweden",
      "value": "SE",
      "alpha3": "SWE",
      "number": "752"
    },
    {
      "label": "Switzerland",
      "value": "CH",
      "alpha3": "CHE",
      "number": "756"
    },
    {
      "label": "Syrian Arab Republic",
      "value": "SY",
      "alpha3": "SYR",
      "number": "760"
    },
    {
      "label": "Taiwan, Province of China",
      "value": "TW",
      "alpha3": "TWN",
      "number": "158"
    },
    {
      "label": "Tajikistan",
      "value": "TJ",
      "alpha3": "TJK",
      "number": "762"
    },
    {
      "label": "Tanzania, United Republic of",
      "value": "TZ",
      "alpha3": "TZA",
      "number": "834"
    },
    {
      "label": "Thailand",
      "value": "TH",
      "alpha3": "THA",
      "number": "764"
    },
    {
      "label": "Timor-Leste",
      "value": "TL",
      "alpha3": "TLS",
      "number": "626"
    },
    {
      "label": "Togo",
      "value": "TG",
      "alpha3": "TGO",
      "number": "768"
    },
    {
      "label": "Tokelau",
      "value": "TK",
      "alpha3": "TKL",
      "number": "772"
    },
    {
      "label": "Tonga",
      "value": "TO",
      "alpha3": "TON",
      "number": "776"
    },
    {
      "label": "Trinidad and Tobago",
      "value": "TT",
      "alpha3": "TTO",
      "number": "780"
    },
    {
      "label": "Tunisia",
      "value": "TN",
      "alpha3": "TUN",
      "number": "788"
    },
    {
      "label": "Turkey",
      "value": "TR",
      "alpha3": "TUR",
      "number": "792"
    },
    {
      "label": "Turkmenistan",
      "value": "TM",
      "alpha3": "TKM",
      "number": "795"
    },
    {
      "label": "Turks and Caicos Islands",
      "value": "TC",
      "alpha3": "TCA",
      "number": "796"
    },
    {
      "label": "Tuvalu",
      "value": "TV",
      "alpha3": "TUV",
      "number": "798"
    },
    {
      "label": "Uganda",
      "value": "UG",
      "alpha3": "UGA",
      "number": "800"
    },
    {
      "label": "Ukraine",
      "value": "UA",
      "alpha3": "UKR",
      "number": "804"
    },
    {
      "label": "United Arab Emirates",
      "value": "AE",
      "alpha3": "ARE",
      "number": "784"
    },
    {
      "label": "United Kingdom of Great Britain and Northern Ireland",
      "value": "GB",
      "alpha3": "GBR",
      "number": "826"
    },
    {
      "label": "United States",
      "value": "US",
      "alpha3": "USA",
      "number": "840"
    },
    {
      "label": "United States Minor Outlying Islands",
      "value": "UM",
      "alpha3": "UMI",
      "number": "581"
    },
    {
      "label": "Uruguay",
      "value": "UY",
      "alpha3": "URY",
      "number": "858"
    },
    {
      "label": "Uzbekistan",
      "value": "UZ",
      "alpha3": "UZB",
      "number": "860"
    },
    {
      "label": "Vanuatu",
      "value": "VU",
      "alpha3": "VUT",
      "number": "548"
    },
    {
      "label": "Venezuela (Bolivarian Republic of)",
      "value": "VE",
      "alpha3": "VEN",
      "number": "862"
    },
    {
      "label": "Vietnam",
      "value": "VN",
      "alpha3": "VNM",
      "number": "704"
    },
    {
      "label": "British Virgin Islands",
      "value": "VG",
      "alpha3": "VGB",
      "number": "092"
    },
    {
      "label": "United States Virgin Islands",
      "value": "VI",
      "alpha3": "VIR",
      "number": "850"
    },
    {
      "label": "Wallis and Futuna",
      "value": "WF",
      "alpha3": "WLF",
      "number": "876"
    },
    {
      "label": "Western Sahara",
      "value": "EH",
      "alpha3": "ESH",
      "number": "732"
    },
    {
      "label": "Yemen",
      "value": "YE",
      "alpha3": "YEM",
      "number": "887"
    },
    {
      "label": "Zambia",
      "value": "ZM",
      "alpha3": "ZMB",
      "number": "894"
    },
    {
      "label": "Zimbabwe",
      "value": "ZW",
      "alpha3": "ZWE",
      "number": "716"
    },
    {
      "label": "Kosovo",
      "value": "XK",
      "alpha3": "XKO",
      "number": ""
    }
  ]

  public getPostCode = (data: any, value: string, bind = 'text') => {
    let d = _.map(data.context, (num) => {
      if (num.id.includes(value)) {
        return num[bind];
      }
    })
    d = _.compact(d);
    return _.head(d);
  }
}
