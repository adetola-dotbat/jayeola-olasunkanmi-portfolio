import type { Project, ProjectCategory, ProjectSummary, Tool } from "@/lib/types";

const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const sheet = (id: string) => `https://docs.google.com/spreadsheets/d/${id}/edit`;
const folder = (id: string) => `https://drive.google.com/drive/folders/${id}`;

export const projects: Project[] = [
  {
    slug: "fintech-transaction-analysis",
    title: "Customer Transaction Analysis for a Nigerian FinTech Platform",
    shortTitle: "FinTech Transaction Analysis",
    summary:
      "An executive Excel workbook that turns 2,500 payment transactions into answers on reliability, geography, products, customers and growth.",
    question:
      "How healthy is the platform's transaction processing, and which states, products and customers drive its value?",
    type: "Freelance project",
    context: "FinTech analytics, FY 2025 data",
    date: "2025",
    tools: ["Excel", "Python"],
    categories: ["Dashboards"],
    featured: true,
    cover: {
      src: "/images/projects/fintech-dashboard.png",
      width: 2000,
      height: 1350,
      alt: "Excel executive dashboard for a Nigerian FinTech platform showing five KPI cards, a monthly revenue trend, revenue by state, revenue by product type, a transaction status donut and a top 10 customers table",
      caption:
        "Executive dashboard: every KPI card, chart and the Top 10 table responds to the State, Account Type and Payment Method slicers.",
    },
    headline: { value: "55.4%", label: "of value from Lagos, FCT Abuja and Rivers" },
    overview: [
      "A 2,500-row transaction dataset for a Nigerian FinTech platform was turned into a nine-sheet Excel workbook that answers six management objectives and ends in an interactive executive dashboard.",
      "Every analytical figure is a live formula linked to the source table, so the workbook updates when new transactions are added. Headline figures were checked independently in Python before delivery.",
    ],
    data: [
      { label: "Records", value: "2,500 transactions, 11 columns" },
      { label: "Period", value: "1 January – 30 December 2025" },
      { label: "Customers", value: "350 unique customers across 10 states" },
      { label: "Transaction types", value: "Transfer, Airtime/Data, Bill Payment, POS Payment, Card Withdrawal" },
      { label: "Quality", value: "No missing values, no duplicate transaction IDs" },
    ],
    approach: [
      { title: "Profile the data", detail: "Checked types, missing values, duplicates, date range and category labels, and pre-computed every key metric in Python as an independent benchmark." },
      { title: "Build with live formulas", detail: "Built each objective sheet with SUMIFS, COUNTIFS, AVERAGEIF and self-sorting LARGE + INDEX/MATCH rankings over a named Excel table." },
      { title: "Validate", detail: "Forced a full recalculation, scanned all 2,218 formulas for errors (none found) and matched the headline results against the Python benchmark." },
      { title: "Dashboard", detail: "Six PivotTables on one shared cache, four pivot charts, five KPI cards and three slicers connected to every PivotTable." },
      { title: "Quality assurance", detail: "Exported every sheet to PDF for visual review and tested the slicers (Lagos: 985 transactions, ₦14,472.47 average, matching Python)." },
    ],
    stats: [
      { value: "₦36.96M", label: "Total transaction value" },
      { value: "88.3%", label: "Successful transactions" },
      { value: "9.6%", label: "Failed transactions" },
      { value: "2,218", label: "Formulas, 0 errors" },
    ],
    findings: [
      "₦36,963,242.61 was transacted across 2,500 transactions, an average of ₦14,785.30 per transaction.",
      "88.3% of transactions succeeded, 9.6% failed and 2.1% were pending. Failed transactions account for ₦3.74M, or 10.1% of attempted value.",
      "Lagos generates 38.6% of value; Lagos, FCT Abuja and Rivers together generate 55.4%.",
      "Transfers are 43.4% of transactions but 75.4% of value. Airtime/Data is 26.4% of transactions but only 3.1% of value.",
      "Revenue is broad-based: the top 10 customers hold only 7.8% of value. Savings accounts (50.0%) and the 35–49 age group (43.4%) lead.",
      "Monthly value is volatile (−34.1% to +58.4% month on month), but the second half of the year was 5.0% above the first.",
    ],
    evidence: [
      { label: "Executive workbook (.xlsx)", href: "/documents/fintech-transaction-analysis-workbook.xlsx", kind: "download", local: true },
      { label: "Project summary report (PDF)", href: "/documents/fintech-transaction-analysis-report.pdf", kind: "pdf", local: true },
    ],
  },
  {
    slug: "mpox-statistical-process-control",
    title: "Monitoring Monkeypox (Mpox) in Nigeria with CUSUM and EWMA Control Charts",
    shortTitle: "Mpox Surveillance with Control Charts",
    summary:
      "A statistical study comparing two control charts for detecting states with unusually high confirmed Mpox cases, using NCDC data from 2017 to 2022.",
    question:
      "Which control chart, CUSUM or EWMA, is better at monitoring the prevalence of confirmed Mpox cases across Nigerian states?",
    type: "Research study",
    context: "Statistical process control, public health",
    date: "Data: Sep 2017 – Dec 2022",
    tools: ["R"],
    categories: ["Statistics"],
    featured: true,
    cover: {
      src: "/images/projects/mpox-cusum-chart.png",
      width: 1358,
      height: 687,
      alt: "CUSUM chart for confirmed Monkeypox cases across 35 Nigerian states, with the early states plotted in red above the upper decision boundary",
      caption: "CUSUM chart: 14 of 35 states fall beyond the decision boundaries (k = 0.5, h = 5).",
    },
    headline: { value: "14 vs 7", label: "out-of-control states flagged by CUSUM vs EWMA" },
    overview: [
      "Monkeypox re-emerged in Nigeria in 2017, and 2022 saw more confirmed cases than the previous five years combined. This study applies statistical process control, a quality-control method, to disease surveillance.",
      "Confirmed cases by state were plotted on CUSUM and EWMA charts in R, and the charts were compared on how many out-of-control states each detected and on their Average Run Length (ARL).",
    ],
    data: [
      { label: "Source", value: "Nigeria Centre for Disease Control (NCDC)" },
      { label: "Period", value: "22 September 2017 – 31 December 2022" },
      { label: "Groups", value: "35 states including the FCT" },
      { label: "Distribution", value: "Mean 28.23, SD 40.39, skewness 3.39, kurtosis 14.26" },
    ],
    approach: [
      { title: "Describe", detail: "Computed descriptive statistics; high skewness and kurtosis showed the case counts are far from normal, with heavy outliers." },
      { title: "Explore", detail: "Charted confirmed cases by state and by year to see where and when cases concentrated." },
      { title: "CUSUM chart", detail: "Plotted a CUSUM chart in R with reference value k = 0.5 and decision interval h = 5 (centre 23.11, SD 22.64)." },
      { title: "EWMA chart", detail: "Plotted an EWMA chart with smoothing parameter λ = 0.2 on the same 35 groups." },
      { title: "Compare", detail: "Compared out-of-control counts and Average Run Lengths across shifts from 0 to 7.5." },
    ],
    stats: [
      { value: "988", label: "Confirmed cases, 2017–2022" },
      { value: "762", label: "Cases confirmed in 2022" },
      { value: "218", label: "Cases in Lagos, the highest" },
      { value: "14", label: "States flagged by CUSUM" },
    ],
    charts: [
      {
        title: "Confirmed Mpox cases in Nigeria by year",
        unit: "cases",
        source: "NCDC data, as reported in the study (Figure 4.2)",
        data: [
          { label: "2017", value: 88 },
          { label: "2018", value: 49 },
          { label: "2019", value: 47 },
          { label: "2020", value: 8 },
          { label: "2021", value: 34 },
          { label: "2022", value: 762 },
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/mpox-ewma-chart.png",
        width: 1355,
        height: 688,
        alt: "EWMA chart for confirmed Monkeypox cases across 35 Nigerian states, with seven early points above the upper control limit",
        caption: "EWMA chart: 7 states beyond the control limits (λ = 0.2).",
      },
    ],
    table: {
      caption: "Average Run Length by shift: a lower ARL means the chart signals sooner.",
      columns: ["Shift", "CUSUM ARL", "EWMA ARL"],
      rows: [
        ["0.00", "465.44", "1,749,420.59"],
        ["0.75", "17.05", "9,565.67"],
        ["1.00", "10.38", "1,944.58"],
        ["1.50", "5.75", "145.41"],
        ["2.50", "3.11", "8.60"],
        ["3.50", "2.23", "3.22"],
        ["5.50", "1.50", "1.62"],
        ["7.50", "1.02", "1.04"],
      ],
    },
    findings: [
      "Lagos had the highest number of confirmed cases (218), followed by Rivers and Bayelsa.",
      "Confirmed cases rose sharply in 2022 (762) compared with 2021 (34).",
      "The CUSUM chart flagged 14 states as out of control: Lagos, Bayelsa, Rivers, Abia, Delta, Imo, Ogun, Ondo, Edo, FCT, Anambra, Cross River, Kwara and Plateau.",
      "The EWMA chart flagged 7: Lagos, Bayelsa, Rivers, Abia, Delta, Imo and Ogun.",
      "CUSUM's ARL was lower than EWMA's at every shift, so it signals an out-of-control state sooner. The study concludes CUSUM is the more efficient chart for monitoring Mpox prevalence.",
    ],
    recommendations: [
      "Government should run public awareness on Mpox symptoms and prevention.",
      "Fund research into new treatments, vaccines and diagnostic tools.",
      "Fund training for health workers to identify and treat Mpox.",
      "People diagnosed with Mpox should isolate and seek advice from a healthcare provider.",
    ],
    evidence: [
      { label: "Full study (Word document)", href: drive("1COdd12YqXeut7-m8HCcjF_aL4RGp40o6"), kind: "drive" },
    ],
  },
  {
    slug: "marketing-campaign-analysis",
    title: "Marketing Campaign Performance Analysis with PostgreSQL and R",
    shortTitle: "Marketing Campaign Analysis",
    summary:
      "SQL queries and exploratory analysis in R across 200,005 campaign records to compare ROI, click-through, cost and conversions by channel, audience and location.",
    question:
      "Which campaigns, channels, audiences and locations deliver the best return, and where should budget move?",
    type: "Internship task",
    context: "HNG Internship, stage two task",
    date: "February 2025",
    tools: ["SQL", "PostgreSQL", "R"],
    categories: ["SQL Analysis", "Statistics"],
    featured: true,
    cover: {
      src: "/images/projects/marketing-sql-channels.png",
      width: 596,
      height: 653,
      alt: "pgAdmin query ranking marketing channels by total conversions, with Email first, followed by Website, Google Ads, YouTube, Instagram and Facebook",
      caption: "Ranking channels by total conversions in PostgreSQL.",
    },
    headline: { value: "Email", label: "ranked first for total conversions" },
    overview: [
      "The dataset tracks marketing campaigns across six channels, five audiences and several US cities, with impressions, clicks, acquisition cost, ROI, conversion rate and engagement score.",
      "The work had two parts: a PostgreSQL report answering eight business questions, and an exploratory analysis in R with calculated metrics, outlier checks and charts.",
    ],
    data: [
      { label: "Observations", value: "200,005 campaigns, 15 variables" },
      { label: "Channels", value: "Email, Website, Google Ads, YouTube, Instagram, Facebook" },
      { label: "Audiences", value: "Men 18–24, Men 25–34, Women 25–34, Women 35–44, All Ages" },
      { label: "Quality", value: "No missing values; date and cost fields converted to proper types" },
    ],
    approach: [
      { title: "Clean", detail: "Converted the Date column to a date type and stripped currency symbols from Acquisition_Cost so it could be treated as numeric." },
      { title: "Query", detail: "Wrote PostgreSQL queries for impressions per campaign, highest ROI, top locations, engagement by audience, overall CTR, cost per conversion, CTR thresholds and channel rankings." },
      { title: "Calculate", detail: "Derived click-through rate (Clicks ÷ Impressions × 100) and cost per click (Acquisition Cost ÷ Clicks) in R, then summarised mean, median and standard deviation." },
      { title: "Visualise", detail: "Built bar charts, box plots, a scatter plot with regression line and an ROI time series with ggplot2." },
    ],
    stats: [
      { value: "200,005", label: "Campaign records" },
      { value: "8", label: "SQL business questions" },
      { value: "5.0", label: "Mean ROI across campaigns" },
      { value: "5.515", label: "Top engagement (Men 18–24)" },
    ],
    code: {
      language: "sql",
      caption: "Ranking channels by total conversions (from the project report)",
      snippet: `SELECT
    channel_used,
    SUM(clicks * conversion_rate) AS totalconversions
FROM
    campaigndata
GROUP BY
    channel_used
ORDER BY
    totalconversions DESC;`,
    },
    gallery: [
      {
        src: "/images/projects/marketing-sql-roi.png",
        width: 579,
        height: 600,
        alt: "SQL query ordering campaigns by ROI descending, returning campaign 168 from NexGen Systems with ROI 8",
        caption: "Highest-ROI campaign: NexGen Systems (ROI 8).",
      },
      {
        src: "/images/projects/marketing-sql-locations.png",
        width: 523,
        height: 600,
        alt: "SQL query summing impressions by location, returning New York, Miami and Chicago as the top three",
        caption: "Top three locations by impressions.",
      },
      {
        src: "/images/projects/marketing-sql-audience.png",
        width: 595,
        height: 666,
        alt: "SQL query averaging engagement score by target audience, with Men 18-24 highest at about 5.515",
        caption: "Average engagement score by audience.",
      },
      {
        src: "/images/projects/marketing-r-roi-by-channel.png",
        width: 614,
        height: 447,
        alt: "R bar chart of average ROI by marketing channel, with all six channels close to 5",
        caption: "Average ROI by channel in R: every channel sits close to 5.",
      },
      {
        src: "/images/projects/marketing-r-boxplots.png",
        width: 614,
        height: 447,
        alt: "Three R box plots showing the distributions of impressions, clicks and acquisition cost",
        caption: "Outlier check: acquisition cost varies more than impressions or clicks.",
      },
      {
        src: "/images/projects/marketing-r-roi-trend.png",
        width: 614,
        height: 447,
        alt: "R line chart of ROI over time during 2021, with repeated peaks and dips",
        caption: "ROI over time shows peaks and dips across 2021.",
      },
    ],
    findings: [
      "The highest-ROI campaign belongs to NexGen Systems (ROI of 8), and another NexGen Systems campaign had the lowest cost per conversion (about 5.02).",
      "New York, Miami and Chicago recorded the most impressions.",
      "Men 18–24 were the most engaged audience, with an average engagement score of 5.515.",
      "Email, Website and Google Ads ranked highest for total conversions, followed by YouTube, Instagram and Facebook.",
      "Average ROI was close to 5.0 on every channel (4.99–5.02), and New York had the lowest average ROI by location (4.98).",
      "Click-through rate and conversion rate showed a positive correlation, and acquisition cost varied far more than impressions or clicks.",
    ],
    recommendations: [
      "Review campaigns with a CTR below 2% for content and targeting.",
      "Study the highest-ROI and lowest-cost campaigns to replicate what works.",
      "Shift budget toward the best-converting channels and optimise or reconsider weaker ones.",
      "Refine audience segmentation and personalise for the most engaged segment.",
      "Track CTR, conversion rate and CPC continuously and use A/B testing.",
      "Set budget thresholds to control unusually high acquisition costs.",
    ],
    evidence: [
      { label: "SQL analysis report (PDF)", href: drive("1wsFTVycE9sUj8PJ6fnDlmzz1Ot-K7Lmp"), kind: "pdf" },
      { label: "Technical report slides", href: drive("1jD9jrQqr1T095FZOVNMPs5dHRlE4B99q"), kind: "drive" },
      { label: "R source code (PDF)", href: drive("1p77i3-_YNOd2s2BgyDagMic026APpR5m"), kind: "pdf" },
      { label: "Project folder", href: folder("1VZFlEPIv7MnApfND4gB7rn1JJ5_Dty1D"), kind: "drive" },
    ],
  },
  {
    slug: "online-sales-dashboard",
    title: "Online Sales Analysis and Dashboards in Excel and Power BI",
    shortTitle: "Online Sales Dashboards",
    summary:
      "A capstone project that analyses 240 online orders and presents revenue by product, region, payment method and month in both Excel and Power BI.",
    question:
      "Which product categories, regions, payment methods and months generate the most online revenue?",
    type: "Training project",
    context: "Capstone project (Task 6B)",
    tools: ["Excel", "Power BI"],
    categories: ["Dashboards"],
    cover: {
      src: "/images/projects/online-sales-powerbi-dashboard.png",
      width: 1200,
      height: 655,
      alt: "Power BI dashboard titled Capstone Project by Jayeola Olasunkanmi Idyat with headline cards and charts of revenue by product category, month, region and payment method",
      caption: "Power BI version of the online sales dashboard.",
    },
    headline: { value: "$80,568", label: "revenue across 240 orders" },
    overview: [
      "A dataset of 240 online transactions from January to August 2024 was summarised with PivotTables and turned into matching dashboards in Excel and Power BI, each opening with plain-language headline cards.",
    ],
    data: [
      { label: "Records", value: "240 transactions" },
      { label: "Period", value: "January – August 2024" },
      { label: "Fields", value: "Date, product category and name, units, unit price, revenue, region, payment method" },
    ],
    approach: [
      { title: "Summarise", detail: "Built PivotTables for revenue by product, region, payment method and month, and units by category and product." },
      { title: "Excel dashboard", detail: "Combined the pivot charts on one sheet with headline cards answering each question." },
      { title: "Power BI dashboard", detail: "Rebuilt the same view in Power BI with cards, bar, line, column and donut charts." },
    ],
    stats: [
      { value: "$80,568", label: "Total revenue" },
      { value: "518", label: "Units sold" },
      { value: "$34,982", label: "Electronics revenue" },
      { value: "$51,171", label: "Paid by credit card" },
    ],
    gallery: [
      {
        src: "/images/projects/online-sales-excel-dashboard.png",
        width: 1380,
        height: 641,
        alt: "Excel dashboard for the online sales capstone with orange headline cards and charts of revenue by product, month, payment method and region, and most sold products",
        caption: "Excel version of the dashboard.",
      },
    ],
    charts: [
      {
        title: "Revenue by product category",
        unit: "USD",
        source: "Online Sales Data sheet, Task 6B workbook",
        data: [
          { label: "Electronics", value: 34982.41 },
          { label: "Home Appliances", value: 18646.16 },
          { label: "Sports", value: 14326.52 },
          { label: "Clothing", value: 8128.93 },
          { label: "Beauty Products", value: 2621.9 },
          { label: "Books", value: 1861.93 },
        ],
      },
    ],
    findings: [
      "Electronics generated the most revenue ($34,982), about 43% of the total.",
      "North America was the highest-revenue region ($36,844), ahead of Asia and Europe.",
      "Credit cards carried the most revenue ($51,171), followed by PayPal and debit cards.",
      "January was the strongest month ($14,548), and revenue broadly declined through to August.",
      "Clothing sold the most units (145), even though it ranked fourth by revenue.",
    ],
    evidence: [
      { label: "Task 6B workbook (Google Sheets)", href: sheet("1h8tdmsPEmRA4fklnPV6CgFeLa9CdUTdP"), kind: "sheet" },
      { label: "Power BI file (.pbix)", href: drive("1Pt5xlRcAJjbkydlOQDRmA6rCk6XeSg0k"), kind: "drive" },
      { label: "Capstone technical report (PDF)", href: drive("1Kj42B9C84JACC_NP-c9iJOWBAhwBOJMF"), kind: "pdf" },
      { label: "Capstone folder", href: folder("1ZEVirL3XvDH7Tjd2jOTsCBPj-VNPjnQq"), kind: "drive" },
    ],
  },
  {
    slug: "hugo-group-sales-report",
    title: "Hugo Group Sales Report in Excel and Power BI",
    shortTitle: "Hugo Group Sales Report",
    summary:
      "A year of company orders analysed for sales trend, top customers, sales representatives and regions, built in Excel and rebuilt in Power BI.",
    question:
      "How did sales move through the year, and which customers, sales representatives and regions contributed most?",
    type: "Training project",
    context: "Excel sales reporting task",
    date: "Order data: 2014",
    tools: ["Excel", "Power BI"],
    categories: ["Dashboards"],
    cover: {
      src: "/images/projects/hugo-excel-dashboard.png",
      width: 1010,
      height: 655,
      alt: "Excel sales dashboard for Hugo Group with headline cards for best region, customer, salesperson and peak month, a monthly sales trend line and bar and pie charts",
      caption: "Excel dashboard with headline answers across the top.",
    },
    headline: { value: "$435,036", label: "total sales, peaking in December" },
    overview: [
      "The brief asked for a sales report on a year of orders covering the sales trend, top 10 customers, sales by representative and regional sales.",
      "The report was built as PivotTables and a dashboard in Excel, and the same data was later modelled as a Power BI dashboard.",
    ],
    data: [
      { label: "Records", value: "369 order lines" },
      { label: "Customers", value: "15 companies" },
      { label: "Sales reps", value: "8" },
      { label: "Regions", value: "North, East, South, West" },
    ],
    approach: [
      { title: "Summarise", detail: "PivotTables for monthly revenue, top 10 customers, revenue by salesperson and revenue by region." },
      { title: "Excel dashboard", detail: "Headline cards for best region, customer, salesperson and peak month above trend, bar and pie charts." },
      { title: "Power BI", detail: "Rebuilt the report in Power BI with KPI cards for quantity, revenue, unit price and maximum revenue." },
    ],
    stats: [
      { value: "$435,036", label: "Total sales" },
      { value: "$66,643", label: "December, the peak month" },
      { value: "$141,660", label: "North region" },
      { value: "$104,242", label: "Top salesperson" },
    ],
    charts: [
      {
        title: "Monthly revenue",
        unit: "USD",
        source: "Order data sheet, Hugo Group workbook",
        data: [
          { label: "Jan", value: 32907.84 },
          { label: "Feb", value: 19955.5 },
          { label: "Mar", value: 30852.6 },
          { label: "Apr", value: 20771.79 },
          { label: "May", value: 34307.05 },
          { label: "Jun", value: 55601.61 },
          { label: "Jul", value: 27318.54 },
          { label: "Aug", value: 29921.46 },
          { label: "Sep", value: 31949.97 },
          { label: "Oct", value: 53033.59 },
          { label: "Nov", value: 31773.43 },
          { label: "Dec", value: 66642.78 },
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/hugo-powerbi-dashboard.png",
        width: 1157,
        height: 657,
        alt: "Power BI dashboard with KPI cards showing 21K quantity, 435.04K revenue, 81.00 maximum unit price and 7.94K maximum revenue, plus revenue by month, salesperson, region and customer",
        caption: "The same data modelled in Power BI.",
      },
    ],
    findings: [
      "Total sales for the year were $435,036.",
      "December was the peak month ($66,643), with further spikes in June and October.",
      "Company D was the best customer ($67,181).",
      "Nancy Freehafer was the top salesperson ($104,242).",
      "The North region led sales ($141,660), ahead of East, South and West.",
    ],
    evidence: [
      { label: "Excel workbook (Google Sheets)", href: sheet("1SA9x-BO19iMlgOsRTdp3hkVebYb8Wv1a"), kind: "sheet" },
      { label: "Power BI file (.pbix)", href: drive("1WSrRUAxLG2cFsurlf8amQ9uzPJiVCVk2"), kind: "drive" },
    ],
  },
  {
    slug: "superstore-sales-insights",
    title: "Superstore Sales and Profitability Insights",
    shortTitle: "Superstore Sales Insights",
    summary:
      "An Excel analysis of 9,977 US retail orders covering regional sales and profit, top products, shipping modes and marketing implications.",
    question:
      "Where do sales and profit come from, and what should marketing focus on?",
    type: "Internship task",
    context: "HNG Internship, stage task",
    date: "January 2025",
    tools: ["Excel"],
    categories: ["Dashboards"],
    cover: {
      src: "/images/projects/superstore-dashboard.png",
      width: 1360,
      height: 699,
      alt: "Excel dashboard for the Sample Superstore dataset with orange headline cards and charts of profit by shipping mode, regional sales, bottom five states, quantities by category and regional profit",
      caption: "Excel dashboard with headline observations across the top.",
    },
    headline: { value: "West", label: "led both sales and profit" },
    overview: [
      "The Sample Superstore dataset holds order-level sales, quantity, discount and profit with product, shipping and location details. The task was to extract marketing insights and present them in an Excel dashboard and written report.",
    ],
    data: [
      { label: "Records", value: "9,977 orders" },
      { label: "Fields", value: "Ship mode, segment, location, region, category, sub-category, sales, quantity, discount, profit" },
    ],
    approach: [
      { title: "Summarise", detail: "PivotTables for profit by shipping mode, sales and profit by region, quantity by category and sub-category, and the weakest states." },
      { title: "Dashboard", detail: "Combined the charts with headline cards stating each observation." },
      { title: "Report", detail: "Wrote a marketing insights report translating the numbers into actions." },
    ],
    stats: [
      { value: "$2.30M", label: "Total sales" },
      { value: "$286.2K", label: "Total profit" },
      { value: "5,971", label: "Binders sold, the top item" },
      { value: "$164.0K", label: "Profit from Standard Class" },
    ],
    charts: [
      {
        title: "Sales by region",
        unit: "USD",
        source: "SampleSuperstore sheet, HNG Task 1 workbook",
        data: [
          { label: "West", value: 725255.64 },
          { label: "East", value: 678435.2 },
          { label: "Central", value: 500782.85 },
          { label: "South", value: 391721.91 },
        ],
      },
    ],
    findings: [
      "Total sales were $2,296,195.59 with $286,241.42 profit.",
      "The West region had both the highest sales ($725,256) and the highest profit ($108,330).",
      "North Dakota was the weakest state by sales ($919.91).",
      "Binders were the most sold item by quantity (5,971 units), and Office Supplies the most sold category (22,861 units).",
      "Standard Class shipping produced the most profit ($163,969).",
    ],
    recommendations: [
      "Build on the West region's strength while working to lift weak states such as North Dakota.",
      "Target promotions at Binders and Office Supplies, which drive volume.",
      "Keep or optimise Standard Class shipping, the most profitable mode.",
      "Analyse discount impact by region and category to refine pricing.",
    ],
    evidence: [
      { label: "Analysis workbook (.xlsx)", href: drive("1Afj7KlQxDusyt0wrrWzXi3uqab2dwneC"), kind: "drive" },
      { label: "Marketing insights report", href: drive("13PoD0SOJOX_vD5zmsDG7vCvd1SjNsYj0"), kind: "drive" },
    ],
  },
  {
    slug: "music-industry-analysis",
    title: "Music Industry Sales: Cleaning and Analysis of 500 Albums",
    shortTitle: "Music Industry Sales",
    summary:
      "Cleaned a messy 500-album dataset, then analysed $7.78B in sales from 1955 to 2011 by artist, album and year in an Excel dashboard.",
    question:
      "Which artists, albums and years sold the most, and how did album sales change over time?",
    type: "Training project",
    context: "Data cleaning (Task 4C) and analysis (Task 5B)",
    tools: ["Excel"],
    categories: ["Data Cleaning", "Dashboards"],
    cover: {
      src: "/images/projects/music-dashboard.png",
      width: 1083,
      height: 649,
      alt: "Excel dashboard titled Data Analysis on Music Industry with headline cards and bar and pie charts of top artists, bottom artists, best albums and best year",
      caption: "Excel dashboard summarising artists, albums and years.",
    },
    headline: { value: "1970", label: "best year, with $459.3M in sales" },
    overview: [
      "The raw album list had inconsistent artist names, including mixed capitalisation and stray spaces. After cleaning, PivotTables and a dashboard answered questions about top and bottom artists, best albums, the best year and the long-run sales trend.",
    ],
    data: [
      { label: "Records", value: "500 albums" },
      { label: "Period", value: "1955 – 2011" },
      { label: "Fields", value: "Year, album, artist, genre, subgenre, total sales" },
    ],
    approach: [
      { title: "Clean", detail: "Standardised artist names by trimming extra spaces and fixing capitalisation (for example, “Bob        DYLAN” became “Bob Dylan”)." },
      { title: "Summarise", detail: "PivotTables for sales by artist, album and year, the bottom five artists and artists with the most albums." },
      { title: "Dashboard", detail: "Headline cards and charts combined on one dashboard sheet." },
    ],
    stats: [
      { value: "$7.78B", label: "Total album sales" },
      { value: "$159.1M", label: "Bob Dylan, the top artist" },
      { value: "$62.7M", label: "“Greatest Hits”, the top album" },
      { value: "1970s", label: "Strongest decade" },
    ],
    charts: [
      {
        title: "Album sales by decade",
        unit: "USD millions",
        source: "Cleaned data sheet, music industry workbook",
        decimals: 1,
        data: [
          { label: "1950s", value: 138.0 },
          { label: "1960s", value: 1606.8 },
          { label: "1970s", value: 2972.8 },
          { label: "1980s", value: 1305.6 },
          { label: "1990s", value: 1172.0 },
          { label: "2000s", value: 563.9 },
          { label: "2010s", value: 18.2 },
        ],
      },
    ],
    beforeAfter: {
      before: "Bob        DYLAN",
      after: "Bob Dylan",
      caption: "Artist names standardised during cleaning",
    },
    findings: [
      "Bob Dylan ($159.1M), The Rolling Stones ($147.7M) and The Beatles ($138.5M) were the top-selling artists: $445.3M combined.",
      "1970 was the best single year, with $459.3M in album sales.",
      "“Greatest Hits” ($62.7M), “Let It Be” ($37.1M) and “Captain Fantastic and the Brown Dirt Cowboy” ($30.0M) were the best-selling albums.",
      "Bob Dylan, The Rolling Stones and The Beatles also had the most albums in the list, 10 each.",
    ],
    evidence: [
      { label: "Analysis workbook (Google Sheets)", href: sheet("19S6hTtNZZ8Sp04pzL1d8wGHWT5D9hCFA"), kind: "sheet" },
      { label: "Data cleaning workbook (.xlsx)", href: drive("1Wc1jrnaruVqKEoQpk1G0GM3zPWqrQZll"), kind: "drive" },
    ],
  },
  {
    slug: "video-game-sales-analysis",
    title: "Global Video Game Sales Analysis",
    shortTitle: "Video Game Sales",
    summary:
      "PivotTable analysis of 16,598 video game titles by genre, platform, publisher, region and year.",
    question:
      "Which genres, platforms and publishers dominate global video game sales, and when did sales peak?",
    type: "Internship task",
    context: "Video game sales analysis",
    date: "Data: 1980 – 2020",
    tools: ["Excel"],
    categories: ["Dashboards"],
    headline: { value: "Nintendo", label: "leads global sales (1,786.6M)" },
    overview: [
      "The dataset lists every title with its platform, year, genre, publisher and sales in North America, Europe, Japan and other regions. PivotTables and charts compared genres by number of releases and by sales, platforms, publishers and yearly totals.",
      "Sales figures in the dataset are recorded in millions.",
    ],
    data: [
      { label: "Records", value: "16,598 titles" },
      { label: "Coverage", value: "31 platforms, 578 publishers, 12 genres" },
      { label: "Regions", value: "North America, Europe, Japan, Other" },
    ],
    approach: [
      { title: "Prepare", detail: "Kept a working copy of the raw data and isolated the regional sales columns." },
      { title: "Summarise", detail: "PivotTables for genre by count and by sales, sales by year, top platforms and top publishers." },
      { title: "Chart", detail: "A chart for each pivot to compare categories at a glance." },
    ],
    stats: [
      { value: "8,920M", label: "Global sales across all titles" },
      { value: "4,393M", label: "North America, the largest region" },
      { value: "3,316", label: "Action titles, the most released genre" },
      { value: "2008", label: "Peak sales year" },
    ],
    charts: [
      {
        title: "Global sales by publisher (top 5)",
        unit: "millions",
        source: "vgsales sheet, video game sales workbook",
        decimals: 1,
        data: [
          { label: "Nintendo", value: 1786.56 },
          { label: "Electronic Arts", value: 1110.32 },
          { label: "Activision", value: 727.46 },
          { label: "Sony Computer Ent.", value: 607.5 },
          { label: "Ubisoft", value: 474.72 },
        ],
      },
      {
        title: "Global sales by platform (top 5)",
        unit: "millions",
        source: "vgsales sheet, video game sales workbook",
        decimals: 1,
        data: [
          { label: "PS2", value: 1255.64 },
          { label: "X360", value: 979.96 },
          { label: "PS3", value: 957.84 },
          { label: "Wii", value: 926.71 },
          { label: "DS", value: 822.49 },
        ],
      },
    ],
    findings: [
      "Nintendo leads global sales (1,786.6M), followed by Electronic Arts (1,110.3M) and Activision (727.5M).",
      "Action is both the most released genre (3,316 titles) and the best-selling (1,751.2M), ahead of Sports and Shooter.",
      "PS2 is the best-selling platform (1,255.6M), followed by X360, PS3 and Wii.",
      "North America accounts for almost half of global sales (4,393M of 8,920M).",
      "Sales peaked in 2008 (678.9M), with 2009 close behind.",
    ],
    evidence: [
      { label: "Analysis workbook (Google Sheets)", href: sheet("1GYYGoGGpvL4Xu_w96c15-fPts47dOw9b"), kind: "sheet" },
    ],
  },
  {
    slug: "global-sales-capstone",
    title: "Global Sales Capstone: 10,000 Orders Across 185 Countries",
    shortTitle: "Global Sales Capstone",
    summary:
      "An Excel capstone answering targeted business questions about revenue and profit across 10,000 orders, 185 countries and 12 product types.",
    question:
      "Which regions and countries are most and least profitable, and how do specific products perform in specific markets?",
    type: "Training project",
    context: "Excel capstone project",
    date: "Order data: 2010 – 2017",
    tools: ["Excel"],
    categories: ["Dashboards"],
    headline: { value: "Europe", label: "top region by revenue ($3.48B)" },
    overview: [
      "The capstone brief posed a set of specific questions, from the top and bottom five countries by profit to the cost of baby food by region and fruit versus snack sales in Nigeria. Each was answered with its own PivotTable and chart.",
    ],
    data: [
      { label: "Records", value: "10,000 orders" },
      { label: "Coverage", value: "7 regions, 185 countries, 12 item types" },
      { label: "Period", value: "January 2010 – July 2017" },
    ],
    approach: [
      { title: "Frame", detail: "Turned each business question into a PivotTable with the right rows, columns and filters." },
      { title: "Answer", detail: "Built one sheet and chart per question: top and bottom countries by profit, revenue by region, year-by-year comparisons and product-specific views." },
    ],
    stats: [
      { value: "$13.33B", label: "Total revenue" },
      { value: "$3.95B", label: "Total profit" },
      { value: "$32.45M", label: "Kiribati, the top profit country" },
      { value: "185", label: "Countries" },
    ],
    charts: [
      {
        title: "Revenue by region",
        unit: "USD billions",
        source: "Sales Data sheet, capstone workbook",
        decimals: 2,
        data: [
          { label: "Europe", value: 3.481 },
          { label: "Sub-Saharan Africa", value: 3.351 },
          { label: "Asia", value: 2.005 },
          { label: "Middle East & N. Africa", value: 1.716 },
          { label: "Central America & Caribbean", value: 1.396 },
          { label: "Australia & Oceania", value: 1.05 },
          { label: "North America", value: 0.335 },
        ],
      },
    ],
    findings: [
      "Europe generated the most revenue ($3.48B), just ahead of Sub-Saharan Africa ($3.35B).",
      "Kiribati, Qatar and Grenada were the most profitable countries (each above $30M).",
      "Tajikistan, Mali and Malta were among the least profitable.",
      "In Nigeria, snacks outsold fruits by units (20,460 vs 14,884).",
    ],
    evidence: [
      { label: "Capstone workbook (Google Sheets)", href: sheet("1w0l9d4nAPJhAdGz32dhWzwjTTI0JFv28"), kind: "sheet" },
    ],
  },
  {
    slug: "product-listing-data-cleaning",
    title: "E-commerce Product Listing Cleaning and Short Title Optimisation",
    shortTitle: "Product Listing Cleanup",
    summary:
      "Cleaned 3,631 product listings in Excel, removing duplicates, filling missing text and creating short, readable titles.",
    question:
      "How can a messy product catalogue be made consistent, complete and easier to read?",
    type: "Internship task",
    context: "HNG Internship, stage one task",
    date: "January 2025",
    tools: ["Excel"],
    categories: ["Data Cleaning"],
    headline: { value: "3,541", label: "clean records from 3,631 listings" },
    overview: [
      "The catalogue had long, keyword-stuffed titles, missing bullet points and descriptions, duplicate records and inconsistent column names. The goal was a clean dataset and concise product titles.",
    ],
    data: [
      { label: "Input", value: "3,631 product listings" },
      { label: "Missing", value: "Bullet points 1,452 · Descriptions 1,985 · Product type and length 178 each" },
      { label: "Duplicates", value: "217 duplicate records identified" },
    ],
    approach: [
      { title: "De-duplicate", detail: "Used Excel's Remove Duplicates on the product ID." },
      { title: "Fill gaps", detail: "Replaced missing bullet points and descriptions with explicit “No bullet points available” and “No description available” values." },
      { title: "Standardise", detail: "Renamed columns to lowercase with underscores (for example, product_id)." },
      { title: "Short titles", detail: "Used LEFT, MID, SUBSTITUTE and LEN, plus Find & Replace for filler words, to keep titles between 30 and 50 characters." },
    ],
    stats: [
      { value: "3,631", label: "Listings in" },
      { value: "3,541", label: "Clean records out" },
      { value: "217", label: "Duplicates identified" },
      { value: "30–50", label: "Characters per short title" },
    ],
    beforeAfter: {
      before:
        "ArtzFolio Tulip Flowers Blackout Curtain for Door, Window & Room | Eyelets & Tie Back | Canvas Fabric | Width 4.5feet (54inch) Height 5 feet (60 inch); 2 PCS",
      after: "ArtzFolio Tulip Flowers Blackout Curtain",
      caption: "Original title vs short title",
    },
    findings: [
      "The clean dataset has no missing values and consistent column names.",
      "Short titles keep the brand, product and key attribute while removing repeated specifications.",
    ],
    evidence: [
      { label: "Cleaning report (Word document)", href: drive("1OGgpPwcRMaDfaf6MrHmf4CezPkav8xhn"), kind: "drive" },
      { label: "Cleaned workbook (.xlsx)", href: drive("1BhAnUq2U6zRSSsKlOSrheyS0TDDLrRdg"), kind: "drive" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);

/** Only tools that at least one project actually uses, in a stable order. */
export function toolsInUse(): Tool[] {
  const order: Tool[] = ["Excel", "Power BI", "SQL", "R", "Python"];
  return order.filter((t) => projects.some((p) => p.tools.includes(t)));
}

export function categoriesInUse(): ProjectCategory[] {
  const order: ProjectCategory[] = ["Dashboards", "Data Cleaning", "SQL Analysis", "Statistics"];
  return order.filter((c) => projects.some((p) => p.categories.includes(c)));
}

export function projectsUsing(tool: Tool) {
  return projects.filter((p) => p.tools.includes(tool));
}

export function toSummary(p: Project): ProjectSummary {
  return {
    slug: p.slug,
    title: p.title,
    shortTitle: p.shortTitle,
    summary: p.summary,
    question: p.question,
    type: p.type,
    tools: p.tools,
    categories: p.categories,
    cover: p.cover,
    headline: p.headline,
    beforeAfter: p.beforeAfter,
    charts: p.charts?.slice(0, 1),
  };
}
