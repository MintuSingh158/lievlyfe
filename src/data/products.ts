// ============================================================================
// LIEVLYFE ENERGY PRODUCT CATALOG DATA
// Official Lineup: 8 Dedicated Products matching official brand banners
// ============================================================================

export interface AISModel {
  voltage: string;
  capacity: string;
  chemistry: "LFP" | "NMC";
  energy: string;
  application?: string;
  discharge?: string;
  dimensions?: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  iconName:
    | "bms"
    | "vibration"
    | "remote"
    | "temp"
    | "ip67"
    | "bluetooth"
    | "gprs"
    | "connectors"
    | "frGrade"
    | "aluminium";
}

export interface Product {
  id: string;
  sku?: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  featured: boolean;
  image: string;
  bannerTag: string;
  chemistryTag: string;
  voltageSummary: string;
  capacitySummary: string;
  energySummary: string;
  cycleLife: string;
  warranty: string;
  ipRating: string;
  shortDescription: string;
  fullDescription: string;
  keySpecs: { label: string; value: string }[];
  features: ProductFeature[];
  aisModels: AISModel[];
  applications: string[];
}

export type ProductCategory =
  | "Electric Scooty Lithium Batteries"
  | "Lithium-ion Batteries For Three Wheelers (L3)"
  | "Lithium-ion Batteries For Three Wheelers (L5)"
  | "Lithium-ion Batteries For E-Tractor"
  | "Lithium-ion Batteries for E-Cleaning Machine"
  | "Inverter Lithium Battery"
  | "Lithium Battery Power System"
  | "Lithium Battery Charger";

export const PRODUCT_CATEGORIES: { id: "All" | ProductCategory; label: string }[] = [
  { id: "All", label: "All Products" },
  { id: "Electric Scooty Lithium Batteries", label: "Electric Scooty" },
  { id: "Lithium-ion Batteries For Three Wheelers (L3)", label: "E-Rickshaw (L3)" },
  { id: "Lithium-ion Batteries For Three Wheelers (L5)", label: "Three Wheelers (L5)" },
  { id: "Lithium-ion Batteries For E-Tractor", label: "E-Tractor" },
  { id: "Lithium-ion Batteries for E-Cleaning Machine", label: "E-Cleaning Machine" },
  { id: "Inverter Lithium Battery", label: "Inverter Batteries" },
  { id: "Lithium Battery Power System", label: "Power Systems (ESS)" },
  { id: "Lithium Battery Charger", label: "Battery Chargers" },
];

// Common 10-point technical features adapted from reference
const STANDARD_BATTERY_FEATURES: ProductFeature[] = [
  {
    title: "Smart BMS",
    description:
      "Microprocessor-based BMS ensures superior reliability, active cell balancing, and remote diagnostic calibration. Technical parameters can be customized for OEM drive systems.",
    iconName: "bms",
  },
  {
    title: "Vibration Pads",
    description:
      "High-density cellular elastomer padding encapsulates cell banks, absorbing multi-axis shocks and road impacts on uneven terrains.",
    iconName: "vibration",
  },
  {
    title: "Remote Assistance",
    description:
      "Call LievLyfe Toll-Free 1800 102 2139 for swift remote diagnostics, telemetry audit, and rapid technical resolution.",
    iconName: "remote",
  },
  {
    title: "Temperature Sensors",
    description:
      "Multi-point thermal probes trigger automatic safety cut-off at 60°C with controlled release and reset at 55°C.",
    iconName: "temp",
  },
  {
    title: "IP67 Rating",
    description:
      "Hermetically sealed enclosure protecting internal electronics from high-pressure water jets, rain immersion, and fine dust penetration.",
    iconName: "ip67",
  },
  {
    title: "Bluetooth Enabled",
    description:
      "Integrated BLE module connects with iOS/Android app to monitor real-time individual cell voltages, state-of-charge (SoC), and temperature metrics.",
    iconName: "bluetooth",
  },
  {
    title: "GPRS & GPS Tracker",
    description:
      "Embedded CAN/IoT telematics chip enables live GPS fleet geolocation, remote anti-theft lockdown, and over-the-air firmware updates.",
    iconName: "gprs",
  },
  {
    title: "Anderson & Chogori Connectors",
    description:
      "Heavy-duty automotive-grade quick-release connectors with silver-plated copper contacts for low insertion loss and zero spark hazard.",
    iconName: "connectors",
  },
  {
    title: "FR Grade Materials",
    description:
      "UL94 V-0 flame-retardant structural holders, ceramic mica paper barriers, and thermal runaway containment between every cell bank.",
    iconName: "frGrade",
  },
  {
    title: "Aluminium Casing",
    description:
      "Aircraft-grade extruded aluminium alloy outer casing delivers outstanding thermal dissipation, structural rigidity, and corrosion protection.",
    iconName: "aluminium",
  },
];

// ============================================================================
// OFFICIAL PRODUCT LINEUP (8 PRODUCTS ONLY)
// ============================================================================
export const PRODUCTS: Product[] = [
  // 1. ELECTRIC SCOOTY LITHIUM BATTERY
  {
    id: "electric-scooty-lithium-battery",
    sku: "LL-SC-2W",
    slug: "electric-scooty-lithium-battery",
    title: "Electric Scooty Lithium Battery",
    subtitle: "High Performance, Safe & Long Life Lithium Battery for Electric Scooters",
    category: "Electric Scooty Lithium Batteries",
    featured: true,
    image: "/assets/products/scooty_battery_banner.jpg",
    bannerTag: "Electric Scooty Grade",
    chemistryTag: "LiFePO4 Technology",
    voltageSummary: "48V / 60V / 72V",
    capacitySummary: "24Ah – 42Ah",
    energySummary: "1.15 kWh – 3.0 kWh",
    cycleLife: "2,500+ Lifecycles",
    warranty: "36 Months Official Warranty*",
    ipRating: "IP67 Waterproof & Dustproof",
    shortDescription:
      "High-power traction battery pack engineered for electric scooties with Smart BMS protection, lightweight thermal casing, and rapid charging support.",
    fullDescription:
      "Specially engineered for high-vibration electric scooters and urban two-wheelers. Features Grade-A lithium iron phosphate (LiFePO4) cells with integrated Smart BMS protection, dual thermal sensors with automatic safety cut-off, and ultra-durable IP67 aluminum casing. Delivers responsive throttle performance, fast 2-hour recharge, and over 2,500 charging lifecycles with zero acid maintenance.",
    keySpecs: [
      { label: "Nominal Voltage", value: "48.0 V / 60.0 V / 72.0 V" },
      { label: "Rated Capacity", value: "24 Ah to 42 Ah" },
      { label: "Stored Energy", value: "1,152 Wh to 3,024 Wh" },
      { label: "Chemistry", value: "Grade-A LiFePO4 (Lithium Iron Phosphate)" },
      { label: "Protection", value: "Smart BMS (Over-Charge, Over-Discharge, Short Circuit)" },
      { label: "Ingress Rating", value: "IP67 Certified Enclosure" },
      { label: "Operating Temp", value: "-10°C to +55°C" },
      { label: "Charging Speed", value: "Up to 15A Rapid Charge (Under 2.5 Hours)" },
    ],
    features: STANDARD_BATTERY_FEATURES,
    aisModels: [
      { voltage: "48V", capacity: "24Ah", chemistry: "LFP", energy: "1,152 Wh", discharge: "30A Cont. / 60A Peak", application: "Low-Speed Electric Scooters (<25 km/h)" },
      { voltage: "48V", capacity: "30Ah", chemistry: "LFP", energy: "1,440 Wh", discharge: "35A Cont. / 70A Peak", application: "City Commuter Electric Scooters" },
      { voltage: "60V", capacity: "30Ah", chemistry: "LFP", energy: "1,800 Wh", discharge: "40A Cont. / 80A Peak", application: "High-Speed EV Two-Wheelers" },
      { voltage: "60V", capacity: "36Ah", chemistry: "LFP", energy: "2,160 Wh", discharge: "45A Cont. / 90A Peak", application: "Commercial Delivery Two-Wheelers" },
      { voltage: "72V", capacity: "36Ah", chemistry: "LFP", energy: "2,592 Wh", discharge: "50A Cont. / 100A Peak", application: "Performance Electric Scooters" },
      { voltage: "72V", capacity: "42Ah", chemistry: "LFP", energy: "3,024 Wh", discharge: "55A Cont. / 110A Peak", application: "Long-Range Fleet Electric Scooters" },
    ],
    applications: [
      "High-Speed & Low-Speed Electric Scooters",
      "Electric Commuter Motorcycles",
      "Quick-Commerce & Food Delivery Fleets (Swiggy, Zomato, Blinkit)",
      "Last-Mile Courier & Logistics Two-Wheelers",
    ],
  },

  // 2. E-RICKSHAW LITHIUM BATTERY (L3)
  {
    id: "e-rickshaw-lithium-battery",
    sku: "LL-3W-L3",
    slug: "e-rickshaw-lithium-battery",
    title: "E-Rickshaw Lithium Battery",
    subtitle: "51.2V / 105Ah (5.376 kWh) High Performance, Safe & Long Life Traction Battery",
    category: "Lithium-ion Batteries For Three Wheelers (L3)",
    featured: true,
    image: "/assets/products/erickshaw_battery_banner.jpg",
    bannerTag: "51.2V / 105Ah • 5.376 kWh",
    chemistryTag: "LiFePO4 Technology",
    voltageSummary: "51.2V Nominal",
    capacitySummary: "105Ah (5.376 kWh)",
    energySummary: "5,376 Wh",
    cycleLife: "3,500+ Lifecycles",
    warranty: "36 Months Official Warranty*",
    ipRating: "IP67 Submersible Sealed",
    shortDescription:
      "The gold standard in commercial passenger E-Rickshaw power: 51.2V 105Ah pack providing 120+ km per charge, 3x faster recharge, and zero acid maintenance.",
    fullDescription:
      "Purpose-built for daily passenger e-rickshaws (L3 category). Replaces 4 heavy lead-acid batteries with a single lightweight 51.2V 105Ah lithium pack, cutting 110 kg of dead weight and increasing daily earning potential. Equipped with heavy-duty brass terminals, high-current Smart BMS, and multi-point temperature sensors for all-weather Indian operating conditions.",
    keySpecs: [
      { label: "Nominal Voltage", value: "51.2 V" },
      { label: "Rated Capacity", value: "105 Ah" },
      { label: "Energy Content", value: "5.376 kWh (5,376 Wh)" },
      { label: "Chemistry", value: "EV Grade-A LiFePO4" },
      { label: "Continuous Discharge", value: "100A (200A Peak)" },
      { label: "Daily Range", value: "110 – 130 km per full charge" },
      { label: "Charging Time", value: "3 to 3.5 Hours Fast Charge" },
      { label: "Weight Savings", value: "Saves ~110 kg compared to Lead Acid" },
    ],
    features: STANDARD_BATTERY_FEATURES,
    aisModels: [
      { voltage: "51.2V", capacity: "105Ah", chemistry: "LFP", energy: "5,376 Wh", discharge: "100A Cont. / 200A Peak", application: "Standard Passenger E-Rickshaw (L3)" },
      { voltage: "51.2V", capacity: "120Ah", chemistry: "LFP", energy: "6,144 Wh", discharge: "120A Cont. / 240A Peak", application: "Heavy-Route Passenger E-Rickshaw" },
    ],
    applications: [
      "Commercial Passenger E-Rickshaws (Mayuri, Yatri, Saarthi, etc.)",
      "Intra-City Passenger Feeder Shuttles",
      "Shared Urban Mobility Fleets",
    ],
  },

  // 3. LITHIUM-ION BATTERIES FOR THREE WHEELERS (L5)
  {
    id: "lithium-ion-batteries-for-three-wheelers-l5",
    sku: "LL-3W-L5",
    slug: "lithium-ion-batteries-for-three-wheelers-l5",
    title: "Lithium-ion Batteries For Three Wheelers (L5)",
    subtitle: "AIS 156 Amendment III Phase 2 Approved Advanced Lithium Technology for L5 Commercial Vehicles",
    category: "Lithium-ion Batteries For Three Wheelers (L5)",
    featured: true,
    image: "/assets/products/threewheeler_l5_battery_banner.jpg",
    bannerTag: "AIS 156 Phase 2 Approved",
    chemistryTag: "AIS 156 LiFePO4",
    voltageSummary: "51.2V / 60V / 72V",
    capacitySummary: "135Ah – 210Ah",
    energySummary: "7.0 kWh – 15.0 kWh",
    cycleLife: "3,500+ Lifecycles",
    warranty: "36 Months Commercial Warranty*",
    ipRating: "IP67 Fleet Heavy Grade",
    shortDescription:
      "Heavy payload commercial traction battery engineered for L5 cargo three-wheelers, auto-rickshaws, and last-mile logistics fleets.",
    fullDescription:
      "Fully compliant with stringent AIS 156 Amendment III Phase 2 automotive safety mandates. Engineered for heavy payload cargo trikes and high-speed L5 auto-rickshaws that run up to 18 hours per day with continuous heavy acceleration and cargo loads up to 1 ton. Includes thermal runaway prevention, CANbus ECU integration, and active Smart BMS telemetry.",
    keySpecs: [
      { label: "Nominal Voltage", value: "51.2V / 60.0V / 72.0V" },
      { label: "Rated Capacity", value: "135Ah to 210Ah" },
      { label: "Energy Content", value: "6.9 kWh to 15.1 kWh" },
      { label: "Compliance", value: "AIS 156 Amendment III Phase 2" },
      { label: "Payload Support", value: "Up to 1,000 kg GVW Cargo" },
      { label: "Fast Charge", value: "1C Rapid Charging Capable" },
      { label: "Ingress Protection", value: "IP67 Waterproof & Dustproof" },
    ],
    features: STANDARD_BATTERY_FEATURES,
    aisModels: [
      { voltage: "51.2V", capacity: "135Ah", chemistry: "LFP", energy: "6,912 Wh", discharge: "120A Cont. / 250A Peak", application: "High-Speed Passenger Auto (L5M)" },
      { voltage: "51.2V", capacity: "160Ah", chemistry: "LFP", energy: "8,192 Wh", discharge: "150A Cont. / 300A Peak", application: "Standard Cargo E-Loader (L5N)" },
      { voltage: "60.0V", capacity: "160Ah", chemistry: "LFP", energy: "9,600 Wh", discharge: "160A Cont. / 320A Peak", application: "High-Torque Heavy Cargo Trike" },
      { voltage: "72.0V", capacity: "210Ah", chemistry: "LFP", energy: "15,120 Wh", discharge: "200A Cont. / 400A Peak", application: "Long-Haul Urban Delivery E-Cargo" },
    ],
    applications: [
      "High-Speed Passenger Auto-Rickshaws (L5M)",
      "Heavy E-Cargo Delivery Vehicles (L5N)",
      "Last-Mile Logistics Fleets (Amazon, Flipkart, Porter, Shadowfax)",
      "Municipal Waste Collection Three-Wheelers",
    ],
  },

  // 4. LITHIUM-ION BATTERIES FOR E-TRACTOR
  {
    id: "e-tractor-batteries",
    sku: "LL-TR-AGRI",
    slug: "e-tractor-batteries",
    title: "Lithium-ion Batteries For E-Tractor",
    subtitle: "AIS 156 Amendment III Phase 2 Approved Heavy-Duty Agricultural Traction Lithium Battery",
    category: "Lithium-ion Batteries For E-Tractor",
    featured: true,
    image: "/assets/products/etractor_battery_banner.jpg",
    bannerTag: "AIS 156 Agricultural Grade",
    chemistryTag: "Heavy-Duty LiFePO4",
    voltageSummary: "72V / 96V",
    capacitySummary: "200Ah – 350Ah",
    energySummary: "14.4 kWh – 33.6 kWh",
    cycleLife: "4,000+ Agricultural Cycles",
    warranty: "36 Months Heavy Field Warranty*",
    ipRating: "IP67 Washdown Protected",
    shortDescription:
      "High-torque agricultural field traction and dual PTO lithium power plant for electric tractors, tillers, and zero-emission farm mechanization.",
    fullDescription:
      "Engineered to withstand intense field soil friction, continuous high PTO draw, and heavy midday farm dust. LievLyfe E-Tractor battery systems deliver unwavering torque curves across changing crop soil resistances, supported by active thermal management and heavy structural steel armoring. Lower operating cost with clean and green farm productivity.",
    keySpecs: [
      { label: "Nominal Voltage", value: "72.0 V / 96.0 V" },
      { label: "Rated Capacity", value: "200 Ah to 350 Ah" },
      { label: "Energy Content", value: "14.4 kWh to 33.6 kWh" },
      { label: "Compliance", value: "AIS 156 Amendment III Phase 2" },
      { label: "Output", value: "Up to 350A Continuous / 700A Peak" },
      { label: "PTO Support", value: "Sustained High-kW Rotary Implements" },
      { label: "Ingress Protection", value: "IP67 Washdown Submersible" },
    ],
    features: STANDARD_BATTERY_FEATURES,
    aisModels: [
      { voltage: "72V", capacity: "200Ah", chemistry: "LFP", energy: "14,400 Wh", discharge: "200A Cont. / 400A Peak", application: "Compact Orchard & Vineyard Tractor (20-25 HP)" },
      { voltage: "72V", capacity: "300Ah", chemistry: "LFP", energy: "21,600 Wh", discharge: "250A Cont. / 500A Peak", application: "Utility Farm Tractor (30-40 HP)" },
      { voltage: "96V", capacity: "250Ah", chemistry: "LFP", energy: "24,000 Wh", discharge: "300A Cont. / 600A Peak", application: "Heavy Plowing & Haulage Tractor (45-55 HP)" },
      { voltage: "96V", capacity: "350Ah", chemistry: "LFP", energy: "33,600 Wh", discharge: "350A Cont. / 700A Peak", application: "Multi-Shift Commercial Agricultural Machine" },
    ],
    applications: [
      "Electric Farm Tractors (20 HP – 55 HP equivalent)",
      "Orchard & Vineyard Inter-Row Sprayer Tractors",
      "Farm Harvesters & Rotary Tillers",
      "Farm Utility Loaders & Haulers",
    ],
  },

  // 5. LITHIUM-ION BATTERIES FOR E-CLEANING MACHINE
  {
    id: "e-cleaning-machine-batteries",
    sku: "LL-CL-IND",
    slug: "e-cleaning-machine-batteries",
    title: "Lithium-ion Batteries for E-Cleaning Machine",
    subtitle: "Industrial Scrubbers, Sweepers & Floor Sanitation Equipment Lithium Battery",
    category: "Lithium-ion Batteries for E-Cleaning Machine",
    featured: false,
    image: "/assets/products/ecleaning_battery_banner.jpg",
    bannerTag: "Industrial Cleaning Grade",
    chemistryTag: "Industrial LiFePO4",
    voltageSummary: "24V / 36V / 48V",
    capacitySummary: "100Ah – 200Ah",
    energySummary: "2.4 kWh – 9.6 kWh",
    cycleLife: "3,000+ Deep Cycles",
    warranty: "36 Months Industrial Warranty*",
    ipRating: "IP67 Chemical & Moisture Sealed",
    shortDescription:
      "Heavy-duty lithium power systems for walk-behind & ride-on floor scrubbers, sweepers, and industrial sanitization equipment.",
    fullDescription:
      "Replaces sluggish lead-acid scrubbers with high-capacity LievLyfe lithium packs. Designed to withstand continuous chemical detergent splashes, scrub-head vibration, and humid environments. Features rapid opportunity charging during shift breaks, constant brush RPM regardless of battery level, and complete protection against over-voltage, temperature, and deep-discharge.",
    keySpecs: [
      { label: "Nominal Voltage", value: "24.0V / 36.0V / 48.0V" },
      { label: "Rated Capacity", value: "100Ah to 200Ah" },
      { label: "Energy Content", value: "2.4 kWh to 9.6 kWh" },
      { label: "Chemistry", value: "Industrial Grade-A LiFePO4" },
      { label: "Charging Time", value: "2 to 3 Hours Full Charge" },
      { label: "Ingress Protection", value: "IP67 Chemical & Water Resistant" },
      { label: "Cycle Life", value: "3,000+ Cycles at 80% DoD" },
    ],
    features: STANDARD_BATTERY_FEATURES,
    aisModels: [
      { voltage: "24V", capacity: "100Ah", chemistry: "LFP", energy: "2,400 Wh", discharge: "80A Cont. / 160A Peak", application: "Walk-Behind Floor Scrubber" },
      { voltage: "24V", capacity: "150Ah", chemistry: "LFP", energy: "3,600 Wh", discharge: "100A Cont. / 200A Peak", application: "Compact Ride-On Sweeper" },
      { voltage: "36V", capacity: "150Ah", chemistry: "LFP", energy: "5,400 Wh", discharge: "120A Cont. / 240A Peak", application: "Heavy Industrial Sweeper" },
      { voltage: "48V", capacity: "200Ah", chemistry: "LFP", energy: "9,600 Wh", discharge: "150A Cont. / 300A Peak", application: "Commercial Facility Ride-On Scrubber" },
    ],
    applications: [
      "Industrial Manufacturing Plant Scrubbers",
      "Commercial Mall & Airport Ride-On Sweepers",
      "Hospital & Pharmaceutical Sanitization Machines",
      "Facility Management Floor Care Fleets",
    ],
  },

  // 6. INVERTER LITHIUM BATTERY
  {
    id: "inverter-lithium-battery",
    sku: "LL-INV-HOME",
    slug: "inverter-lithium-battery",
    title: "Inverter Lithium Battery",
    subtitle: "Reliable Power for Home & Business — Compact, High-Efficiency LiFePO4 Inverter Systems",
    category: "Inverter Lithium Battery",
    featured: false,
    image: "/assets/products/inverter_battery_banner.jpg",
    bannerTag: "Home & Business Power",
    chemistryTag: "LiFePO4 Technology",
    voltageSummary: "12.8V / 25.6V / 51.2V",
    capacitySummary: "100Ah – 105Ah",
    energySummary: "1.28 kWh – 5.376 kWh",
    cycleLife: "4,000+ Deep Cycles",
    warranty: "60 Months Replacement Warranty*",
    ipRating: "IP65 Indoor / Protected Enclosure",
    shortDescription:
      "Next-gen household and commercial lithium inverter battery packs delivering 10x longer lifespan, 0% acid fumes, and instant 1-hour fast recharge.",
    fullDescription:
      "Say goodbye to bulky lead-acid inverter batteries and hazardous acid fumes. LievLyfe Inverter Lithium Batteries provide ultra-compact, maintenance-free, silent power backup for homes, offices, solar storage, routers, and critical medical and retail equipment. Available in 12.8V 100Ah (1.28 kWh), 25.6V 100Ah (2.56 kWh), and 51.2V 105Ah (5.376 kWh) variants with integrated BMS protection.",
    keySpecs: [
      { label: "Nominal Voltages", value: "12.8V / 25.6V / 51.2V" },
      { label: "Capacities", value: "100Ah / 100Ah / 105Ah" },
      { label: "Energy Content", value: "1.28 kWh / 2.56 kWh / 5.376 kWh" },
      { label: "Chemistry", value: "LiFePO4 (Lithium Iron Phosphate)" },
      { label: "Inverter Compatibility", value: "Works with all leading Pure Sine Wave inverters" },
      { label: "Efficiency", value: ">98% Round-Trip Electrical Efficiency" },
      { label: "Life Expectancy", value: "10+ Years (4,000+ Cycles)" },
    ],
    features: STANDARD_BATTERY_FEATURES,
    aisModels: [
      { voltage: "12.8V", capacity: "100Ah", chemistry: "LFP", energy: "1,280 Wh", discharge: "100A Cont. / 200A Peak", application: "1.28 kWh Compact Home Inverter" },
      { voltage: "25.6V", capacity: "100Ah", chemistry: "LFP", energy: "2,560 Wh", discharge: "100A Cont. / 200A Peak", application: "2.56 kWh Double-Battery Inverter Upgrade" },
      { voltage: "51.2V", capacity: "105Ah", chemistry: "LFP", energy: "5,376 Wh", discharge: "100A Cont. / 200A Peak", application: "5.376 kWh Heavy Home & Commercial Inverter" },
    ],
    applications: [
      "Residential Home Power Backup & Inverters",
      "Commercial Office & Workstation Uninterrupted Power",
      "Rooftop Solar Energy Storage",
      "Internet Routers, Servers & CCTV Backup",
      "Emergency Clinic & Retail Lighting",
    ],
  },

  // 7. LITHIUM BATTERY POWER SYSTEM (ESS)
  {
    id: "lithium-battery-power-system",
    sku: "LL-ESS-CABINET",
    slug: "lithium-battery-power-system",
    title: "Lithium Battery Power System",
    subtitle: "Reliable, Efficient & Long-Lasting Integrated Cabinet Power Storage System with LCD Telemetry",
    category: "Lithium Battery Power System",
    featured: false,
    image: "/assets/products/power_system_cabinet_banner.jpg",
    bannerTag: "51.2V 105Ah Cabinet",
    chemistryTag: "Integrated ESS LiFePO4",
    voltageSummary: "51.2V Nominal",
    capacitySummary: "105Ah (Scalable ESS)",
    energySummary: "5.376 kWh per Unit",
    cycleLife: "4,500+ Lifecycles",
    warranty: "60 Months System Warranty*",
    ipRating: "Industrial Vented Cabinet with Dual Exhaust",
    shortDescription:
      "All-in-one standalone energy storage tower featuring front LCD display, dual cooling fans, and high-capacity 5.376 kWh LiFePO4 storage.",
    fullDescription:
      "The ultimate plug-and-play energy storage system for demanding commercial facilities, telecom towers, solar installations, and luxury residences. Features a sleek blue powder-coated cabinet with real-time backlit LCD display showing SOC%, voltage, and load. Equipped with circuit breakers, dual rear cooling fans, high-current busbars, and multi-tier Smart BMS protection.",
    keySpecs: [
      { label: "Nominal Voltage", value: "51.2 V" },
      { label: "Rated Capacity", value: "105 Ah" },
      { label: "Stored Energy", value: "5.376 kWh" },
      { label: "LCD Telemetry", value: "Live SOC%, Pack Voltage, System Status" },
      { label: "Rear Panel", value: "Dual High-CFM Exhaust Fans, AC In/Out, DC Battery Breakers" },
      { label: "Parallel Expansion", value: "Link up to 8 cabinets for over 43 kWh total capacity" },
      { label: "Chemistry", value: "EV-Grade LiFePO4 Cells" },
    ],
    features: STANDARD_BATTERY_FEATURES,
    aisModels: [
      { voltage: "51.2V", capacity: "105Ah", chemistry: "LFP", energy: "5,376 Wh", discharge: "100A Cont. / 200A Peak", application: "Standard Commercial ESS Tower" },
      { voltage: "51.2V", capacity: "210Ah", chemistry: "LFP", energy: "10,752 Wh", discharge: "200A Cont. / 400A Peak", application: "Dual-Bank Parallel Power System" },
      { voltage: "51.2V", capacity: "420Ah", chemistry: "LFP", energy: "21,504 Wh", discharge: "300A Cont. / 600A Peak", application: "Microgrid Multi-Cabinet Power Station" },
    ],
    applications: [
      "Solar Microgrids & Rooftop Photovoltaic Storage",
      "Corporate Office Server Rooms & Data Hubs",
      "Petrol Pumps & EV Charging Station Buffer",
      "Luxury Farmhouses & Off-Grid Living",
      "Commercial Clinics & Diagnostic Labs",
    ],
  },

  // 8. LITHIUM BATTERY CHARGER
  {
    id: "lithium-battery-charger",
    sku: "LL-CH-1200W",
    slug: "lithium-battery-charger",
    title: "Lithium Battery Charger",
    subtitle: "1200W (1.2 KW) High-Power Intelligent Lithium Battery Charger (48V to 84V / 22A Max)",
    category: "Lithium Battery Charger",
    featured: false,
    image: "/assets/products/lithium_charger_banner.jpg",
    bannerTag: "1200W High Power",
    chemistryTag: "Intelligent SMPS",
    voltageSummary: "48V – 84V Auto",
    capacitySummary: "22A Max Current",
    energySummary: "1.2 kW Output",
    cycleLife: "10,000+ Operating Hours MTBF",
    warranty: "24 Months Replacement Warranty*",
    ipRating: "Anodized Aluminium IP54 Enclosure",
    shortDescription:
      "Heavy-duty 1.2 kW intelligent switch-mode lithium charger with automatic CC/CV profile, forced-air cooling, and multi-stage electrical safeguards.",
    fullDescription:
      "Engineered specifically for LievLyfe LiFePO4 and lithium-ion traction packs. Provides ultra-fast, safe charging across 48V to 84V systems with up to 22 Amps charging current. Features high-efficiency switch-mode architecture, dual LED status indicators (Power & Charging), intelligent temperature-regulated cooling fan, and full over-voltage, over-current, and reverse polarity protections.",
    keySpecs: [
      { label: "Rated Output Power", value: "1,200 Watts (1.2 kW)" },
      { label: "Voltage Range", value: "48V to 84V Dynamic CC/CV" },
      { label: "Max Charge Current", value: "22 Amps" },
      { label: "Enclosure", value: "Blue Extruded Anodized Aluminium with Carrying Handle" },
      { label: "Cooling", value: "High-Speed Ball-Bearing Fan with Intelligent Thermal Throttle" },
      { label: "Connectors", value: "Heavy-duty Anderson SB50 / Chogori EV output plug" },
      { label: "Efficiency", value: ">92% Conversion Efficiency" },
    ],
    features: [
      {
        title: "High Efficiency",
        description: "Advanced resonant topology delivers over 92% power conversion efficiency with minimal waste heat.",
        iconName: "bms",
      },
      {
        title: "Advanced Forced Cooling",
        description: "Intelligent variable-speed exhaust fan activates based on heatsink temperature to maintain optimum performance.",
        iconName: "temp",
      },
      {
        title: "Smart Protection",
        description: "Microcontroller monitors voltage, current, and cell feedback to automatically terminate charge upon full saturation.",
        iconName: "bms",
      },
      {
        title: "Over-Voltage / Current Guard",
        description: "Multi-tier hardware clamp circuits isolate the battery in case of grid voltage spikes or short circuit conditions.",
        iconName: "frGrade",
      },
      {
        title: "Aluminium Enclosure",
        description: "Rugged blue anodized extruded aluminium housing with ergonomic top carry handle and shock-absorbing rubber feet.",
        iconName: "aluminium",
      },
    ],
    aisModels: [
      { voltage: "48V", capacity: "20A", chemistry: "LFP", energy: "1,000 W", discharge: "Constant Current / Constant Voltage", application: "Electric Scooty & Light Trike Charger" },
      { voltage: "51.2V", capacity: "22A", chemistry: "LFP", energy: "1,200 W", discharge: "High-Speed Rapid Charge", application: "E-Rickshaw Fast Charger (3.5 Hr Full Charge)" },
      { voltage: "60V", capacity: "20A", chemistry: "LFP", energy: "1,200 W", discharge: "Constant Current / Constant Voltage", application: "High-Speed Two-Wheeler Charger" },
      { voltage: "72V", capacity: "16A", chemistry: "LFP", energy: "1,200 W", discharge: "Constant Current / Constant Voltage", application: "L5 E-Cargo & Utility Charger" },
    ],
    applications: [
      "E-Rickshaw Fleet Fast Charging Stations",
      "Electric Two-Wheeler Home & Depot Charging",
      "Industrial Cleaning Machine Overnight Charging",
      "Commercial Lithium Battery Swap Hubs",
    ],
  },
];

// Helper utilities
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  const direct = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  if (direct) return direct;

  // Backward compatibility alias routing
  if (slug === "lithium-ion-batteries-for-two-wheelers") {
    return PRODUCTS.find((p) => p.slug === "electric-scooty-lithium-battery");
  }
  if (slug === "lithium-ion-batteries-for-three-wheelers-l3") {
    return PRODUCTS.find((p) => p.slug === "e-rickshaw-lithium-battery");
  }
  return undefined;
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}
