import React, { useState, useRef } from "react";

type Branch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
  isMain?: boolean;
};

// Hand-calibrated coordinates precisely matching the 0 0 400 500 SVG map
const ALL_BRANCHES: Branch[] = [
  // 8 Main Hubs (Large Red Pins)
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 210, cy: 260, isMain: true },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 310, cy: 390, isMain: true },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 340, cy: 150, isMain: true },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 140, cy: 350, isMain: true },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 60, cy: 210, isMain: true },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 200, cy: 380, isMain: true },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 140, cy: 95, isMain: true },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 220, cy: 140, isMain: true },
  
  // Sub-Branches (Glowing Cyan Nodes)
  { id: "narayanganj", name: "YRC Narayanganj", cx: 220, cy: 270 },
  { id: "brahmanbaria", name: "YRC Brahmanbaria", cx: 270, cy: 240 },
  { id: "naogaon", name: "YRC Naogaon", cx: 110, cy: 170 },
  { id: "bhairab", name: "YRC Bhairab", cx: 250, cy: 210 },
  { id: "charfesson", name: "YRC Charfesson", cx: 225, cy: 410 },
  { id: "nazipur", name: "YRC Nazipur", cx: 100, cy: 150 },
  { id: "kishoreganj", name: "YRC Kishoreganj", cx: 250, cy: 180 },
  { id: "chirirbondor", name: "YRC Chirirbondor", cx: 125, cy: 85 },
  { id: "dhunat", name: "YRC Dhunat", cx: 170, cy: 165 },
  { id: "sadardakshin", name: "YRC Sadar Dakshin", cx: 275, cy: 305 },
  { id: "chhagalnaiya", name: "YRC Chhagalnaiya", cx: 300, cy: 330 },
  { id: "chandpur", name: "YRC Chandpur", cx: 250, cy: 320 },
  { id: "muradpur", name: "YRC Muradpur", cx: 315, cy: 395 },
  { id: "mirpur", name: "Mirpur Branch", cx: 205, cy: 255 },
  { id: "rangamati", name: "YRC Rangamati", cx: 340, cy: 360 }, 
  { id: "coxsbazar", name: "YRC Cox's Bazar", cx: 340, cy: 470 }, // Safely at the bottom tip!
  { id: "chakaria", name: "YRC Chakaria", cx: 330, cy: 440 }, // Safely inland
  { id: "paltan", name: "Paltan Branch", cx: 212, cy: 262 },
  { id: "madaripur", name: "YRC Madaripur", cx: 190, cy: 310 },
  { id: "khilgaon", name: "Khilgaon Branch", cx: 215, cy: 258 },
  { id: "jashore", name: "YRC Jashore", cx: 110, cy: 300 },
  { id: "fulgazi", name: "YRC Fulgazi", cx: 305, cy: 320 },
  { id: "singair", name: "YRC Singair", cx: 190, cy: 250 },
  { id: "eidgaon", name: "YRC Eidgaon", cx: 335, cy: 455 }, 
  { id: "laksham", name: "YRC Laksham", cx: 285, cy: 315 },
  { id: "shariatpur", name: "YRC Shariatpur", cx: 210, cy: 315 },
  { id: "patiya", name: "YRC Patiya", cx: 320, cy: 400 },
  { id: "domar", name: "YRC Domar", cx: 135, cy: 65 },
  { id: "natore", name: "YRC Natore", cx: 110, cy: 200 },
  { id: "anowara", name: "YRC Anowara", cx: 315, cy: 405 },
  { id: "debiganj", name: "YRC Debiganj", cx: 130, cy: 50 },
  { id: "saidpur", name: "YRC Saidpur", cx: 120, cy: 75 },
  { id: "kushtia", name: "YRC Kushtia", cx: 100, cy: 250 },
  { id: "fatikchari", name: "YRC Fatikchari", cx: 325, cy: 375 },
  { id: "sakhipur", name: "YRC Sakhipur", cx: 215, cy: 200 },
  { id: "bogura", name: "YRC Bogura", cx: 160, cy: 160 },
  { id: "boalkhali", name: "YRC Boalkhali", cx: 325, cy: 390 },
  { id: "barguna", name: "YRC Barguna", cx: 170, cy: 410 },
  { id: "satkhira", name: "YRC Satkhira", cx: 100, cy: 360 },
  { id: "dinajpur", name: "YRC Dinajpur", cx: 100, cy: 80 },
  { id: "badda", name: "Badda Branch", cx: 215, cy: 250 },
  { id: "faridpur", name: "YRC Faridpur", cx: 170, cy: 280 },
  { id: "keraniganj", name: "Keraniganj Branch", cx: 205, cy: 265 },
  { id: "gafargaon", name: "YRC Gafargaon", cx: 230, cy: 165 },
  { id: "pirganj", name: "YRC Pirganj", cx: 145, cy: 125 },
  { id: "manikganj", name: "YRC Manikganj", cx: 180, cy: 250 },
  { id: "jatrabari", name: "Jatrabari Branch", cx: 215, cy: 265 },
  { id: "kalkini", name: "Kalkini Branch", cx: 195, cy: 320 },
  { id: "gaibandha", name: "YRC Gaibandha", cx: 160, cy: 120 },
  { id: "jhalokati", name: "YRC Jhalokati", cx: 180, cy: 380 },
  { id: "pekua", name: "YRC Pekua", cx: 325, cy: 450 }, 
  { id: "sherpurbogura", name: "YRC Sherpur Bogura", cx: 165, cy: 170 },
  { id: "birganj", name: "YRC Birganj", cx: 110, cy: 75 },
  { id: "tangail", name: "YRC Tangail", cx: 180, cy: 200 },
  { id: "shathibari", name: "YRC Shathibari", cx: 150, cy: 110 },
  { id: "nilphamari", name: "YRC Nilphamari", cx: 130, cy: 70 },
  { id: "pabna", name: "YRC Pabna", cx: 140, cy: 230 },
  { id: "hathazari", name: "YRC Hathazari", cx: 315, cy: 375 },
  { id: "gournadi", name: "YRC Gournadi", cx: 195, cy: 360 },
  { id: "tejgaon", name: "Tejgaon Branch", cx: 210, cy: 255 },
  { id: "gopalganj", name: "YRC Gopalganj", cx: 165, cy: 320 },
  { id: "uttara", name: "Uttara Branch", cx: 210, cy: 245 },
  { id: "dohar", name: "YRC Dohar", cx: 190, cy: 280 },
  { id: "sadarpur", name: "YRC Sadarpur", cx: 185, cy: 295 },
  { id: "nawabganj", name: "YRC Nawabganj", cx: 200, cy: 275 },
  { id: "panchagarh", name: "YRC Panchagarh", cx: 130, cy: 30 }, // Exact top tip
  { id: "purandhaka", name: "YRC Puran Dhaka", cx: 212, cy: 265 },
  { id: "jhenaidah", name: "YRC Jhenaidah", cx: 110, cy: 275 },
  { id: "habiganj", name: "YRC Habiganj", cx: 300, cy: 190 },
  { id: "pirojpur", name: "YRC Pirojpur", cx: 170, cy: 360 },
  { id: "bhaluka", name: "YRC Bhaluka", cx: 210, cy: 180 },
  { id: "katiadi", name: "YRC Katiadi", cx: 240, cy: 185 },
  { id: "ashulia", name: "YRC Ashulia", cx: 205, cy: 235 },
  { id: "ghatail", name: "YRC Ghatail", cx: 195, cy: 190 },
  { id: "daulatpur", name: "Khulna - Daulatpur", cx: 145, cy: 345 },
  { id: "meherpur", name: "YRC Meherpur", cx: 60, cy: 250 },
  { id: "muradnagar", name: "YRC Muradnagar", cx: 265, cy: 260 },
  { id: "savar", name: "Savar Branch", cx: 200, cy: 245 },
  { id: "baniyachong", name: "Baniyachong Wing", cx: 290, cy: 180 },
  { id: "joypurhat", name: "YRC Joypurhat", cx: 125, cy: 160 },
  { id: "boda", name: "YRC Boda", cx: 125, cy: 40 },
  { id: "kurigram", name: "YRC Kurigram", cx: 180, cy: 95 },
  { id: "phulpur", name: "YRC Phulpur", cx: 220, cy: 155 },
  { id: "sapahar", name: "YRC Sapahar", cx: 100, cy: 160 },
  { id: "babuganj", name: "YRC Babuganj", cx: 205, cy: 370 },
  { id: "dhanbari", name: "YRC Dhanbari", cx: 185, cy: 180 },
  { id: "manirampur", name: "YRC Manirampur", cx: 125, cy: 315 },
];

// Beautiful curved loop traversing all major regions safely on the map
const BIKE_PATH =
  "M 210,260 Q 250,150 340,150 Q 300,300 310,390 L 340,470 Q 200,420 140,350 Q 60,280 60,210 Q 100,100 140,95 Q 180,180 210,260";

// Exact SVG code provided, placed directly in React so it never requires fetching or re-rendering
const BD_SVG_PATH = "m25.212 83.944s-2.3768 1.6376-4.7535 1.6376c-2.3768 0-1.9806 2.4563-3.9613 1.6376-1.9806-0.8188-5.5458-3.6845-4.3574-5.7315 1.1884-2.0469 3.5651-3.2751 1.5845-7.369s2.7729 0 1.5845-4.5033-0.39614-2.0469 1.1884-5.7314 0-2.047 0.79225-6.5503c0.79225-4.5032 4.7535-9.8253 7.1303-9.8253s7.1303-0.40938 7.9225-2.8657c0.79225-2.4563-0.39615-6.5502 3.5651-9.8253 3.9613-3.2751 6.7342-1.2282 8.3186-2.8657 1.5845-1.6376 0.39615-3.2751-1.1884-5.322-1.5845-2.0469 0-3.6845-3.5651-4.0939-3.5651-0.40938-4.3574-4.0939-5.9419-0.81876s-2.3768 6.9596-3.5651 2.0469c-1.1884-4.9127-1.1884-4.9127 1.1884-8.5971 2.3768-3.6845 1.9806-9.0066 4.7535-8.5972 2.7729 0.40942 2.3768-1.6376 2.7729 2.047 0.39615 3.6845-0.39615 5.7314 3.169 6.9596 3.5651 1.2281 3.9613 2.4563 5.9419 4.5032s3.9613-1.6376 5.5458 0.81876c1.5845 2.4563 0.79225 4.0939 3.169 4.5033 2.3768 0.40938 2.3768 2.0469 4.3574 4.9127 1.9806 2.8657 3.169 0 5.1496 2.8657s0.39611 3.6845 4.7535 4.9127 7.1303-1.2282 9.1109 0.8188 0.39615 2.8657 5.5458 2.4563c5.1496-0.40934 8.3187-1.6376 3.5651-4.0939-4.7535-2.4564-4.3574-7.7784-7.5264-6.5502-3.169 1.2281-6.7342-3.2751-4.7535-4.9127 1.9806-1.6376 0.79226-3.2751 3.5651-2.8657 2.7729 0.40938 1.1884 2.4563 6.338 3.6845s2.7729-2.0469 5.1496 2.8657c2.3768 4.9127 5.5458 4.9127 3.9613 7.369-1.5845 2.4564-1.5845 0 0.39615 5.3221 1.9806 5.322-1.5845 6.9596 3.9613 9.4159s2.3768 2.4563 6.338 4.5033c3.9613 2.0469 9.9032 0.40938 14.261 3.6845 4.3574 3.2751 5.5458 1.2282 7.9225 3.2751 2.3768 2.0469 2.3768-4.5032 4.3574-4.9127 1.9806-0.40938 4.7535-2.4564 2.3768-4.5033-2.3768-2.0469-5.1496-2.8657-3.169-5.7315 1.9806-2.8657 3.9613-1.2281 4.3574-2.8657 0.39611-1.6376-1.5845-2.8657-0.39615-3.6845 1.1884-0.81876 3.5651-2.8657 3.9613-0.81876 0.39611 2.047-2.3768 4.9127 0.39611 5.7314 2.7729 0.8188 5.1496 1.2282 2.7729 0.8188-2.3768-0.40938 5.5458 4.0939 5.9419 5.7315 0.39611 1.6376-1.1884 5.7315 0.39611 6.9596 1.5845 1.2282 0.79226 0.81876 2.7729 2.4563 1.9806 1.6376-0.39614 4.9127 1.5845 4.9127s3.5651-1.2282 2.7729 0.40938c-0.79225 1.6376-3.5651 4.5033-3.5651 4.5033s-1.5845 2.4563-0.79225 6.5502 1.9806 9.8253 1.9806 13.1c0 3.2751 1.1884 17.194 0.79225 20.469-0.3961 3.2751-3.5651 11.872-1.9806 13.51 1.5845 1.6376 1.5845 4.5033 4.7535 2.4563 3.169-2.0469 3.9613-1.6376 7.1303-0.40938s3.169 3.6845 9.1109 3.6845 6.7341 2.4563 11.488 3.6845c4.7535 1.2282 9.507 2.8657 15.449 3.2751 5.9419 0.40937 3.9613-2.0469 8.7148-2.0469s7.9225-3.6845 11.488-1.2282c3.5651 2.4564 1.9806 2.4564 6.7341 1.2282s7.1303-0.40942 9.507 0.40937c2.3768 0.81881 4.3574 1.2282 13.072-2.4563 8.7148-3.6845 11.092 0 13.864-1.2281 2.7729-1.2282 9.9032 0.81876 13.468 0.81876 3.5651 0 5.9419-1.2282 8.7148 0.81879 2.7729 2.0469 7.1303 0 10.299-0.81879 3.169-0.81876-0.79225 1.2282 6.338 1.6376 7.1303 0.40938 11.884-6.5502 13.864-5.322 1.9806 1.2282 13.468 1.2282 17.43 0.81875 3.9612-0.40938 5.9419-0.40938 7.5264 1.2282s1.5845-3.2751 7.1303 2.0469c5.5458 5.3221 2.7729 5.7314 8.7148 7.7784 5.9419 2.0469 7.5263-0.40941 10.695 5.322 3.1691 5.7314 4.7535 3.2751 4.3573 7.7784-0.39623 4.5033-1.5844 6.1408-7.9224 5.322-6.3381-0.81875-8.3187-6.9596-10.299-4.9127-1.9806 2.0469-3.9613 0.8188-1.5845 4.5033s5.5458 3.6845 4.3574 8.5971c-1.1883 4.9127-4.3574 6.5503-4.3574 10.235 0 3.6845 3.9613 7.369 1.9806 11.872-1.9806 4.5033-2.3768 1.6376-5.5457 1.6376-3.169 0-4.3574 0.81875-3.169 4.0939 1.1884 3.2751 2.7729 3.2751-0.79225 6.1408-3.5651 2.8657-14.261 0-13.072 2.8657 1.1884 2.8657 5.5458 6.1408 1.9806 6.1408-3.5651 0-7.1303-1.2282-5.5458 2.0469s2.3768 10.644-1.5845 12.282c-3.9613 1.6376-1.1884 0.40937-5.9419-2.8657s-6.7342-4.9127-6.7342-2.4564c0 2.4564 3.5651 8.5972 0.79225 9.0066-2.7729 0.40938-7.9225-4.9127-7.9225-4.9127s1.9806 1.6376-1.5845 6.5502-18.618 5.3221-19.41 4.5033c-0.79225-0.8188 3.169 2.4564-0.79225 5.7314-3.9613 3.2751-4.7535 0.81876-7.1303 3.2751s-4.3574 5.322-5.1496 9.0066c-0.79225 3.6845-2.3768 11.463-2.3768 11.463s-9.507-1.6376-5.9419 2.4563 11.092 2.4564 5.9419 4.0939c-5.1496 1.6375-9.1109 1.2282-4.7535 6.1408 4.3574 4.9127 7.5264 2.4563 7.5264 8.1878 0 5.7314 4.3574 19.241 4.7535 23.335 0.3961 4.0939-1.1884 9.4159 0.3961 10.644s7.9225 3.2751 7.9225 3.2751-1.5845-1.2282-0.79226-9.416c0.79226-8.1878-0.39611-10.644 1.5845-10.235 1.9806 0.40938 2.3768 2.8657 3.169 6.1408 0.79226 3.2751 1.5845 2.0469 2.7729 7.369 1.1884 5.322 1.1884 7.369 3.9613 10.235 2.7729 2.8657 0 6.9596 5.9419 4.5033s6.7342-1.6376 10.695-6.1408c3.9613-4.5033 6.338-4.9127 5.1496-9.4159-1.1884-4.5033-1.9806-12.691-3.9613-15.147-1.9806-2.4564 1.1884-0.8188 1.1884-4.5033s-1.5845-7.369 0.79226-6.9596c2.3768 0.40938 2.3768 5.3221 4.7535 2.047 2.3768-3.2751 2.3768 2.8657 5.5458-4.0939s1.5845-11.053 1.5845-15.966c0-4.9127 1.1884-9.8253 3.9613-6.9596s-1.5845 6.9596 2.7729 6.9596 11.488-9.0066 11.488-9.0066 2.7729 5.7314 3.9612 6.9596c1.1884 1.2282-1.9806-4.9126 1.5845-5.322 3.5652-0.40938 3.5652 3.6845 3.5652 7.369s1.1884 5.322 1.9806 9.8253c0.79225 4.5033 0.79225 0.81879 1.9807 6.5502 1.1884 5.7315 4.7535 6.1408 4.3574 9.0066-0.39623 2.8657 1.9806 3.2751 1.1883 6.1408-0.79221 2.8657-3.9612 2.0469-3.9612 6.9596s5.5458 5.7315 4.7536 10.235c-0.79237 4.5033-1.9806 11.053-0.79237 12.691 1.1884 1.6376 7.9226 0 8.7148 7.369 0.79233 7.369 3.169 9.8253 3.9613 13.1 0.79218 3.2751 0.79218 2.8657 0.79218 9.0066 0 6.1408 1.1884 6.9596 2.3768 10.644 1.1884 3.6845 1.1884 4.5032 1.1884 7.7783s1.5845 3.6845 1.9806 6.5502c0.39623 2.8657 0.79225 1.6376 1.5845 7.369 0.79225 5.7315 2.3768 5.322 0.79225 9.416-1.5845 4.0939-3.5652 0.40938-2.7729 4.0939 0.79221 3.6845-0.79229 3.6845 0.79221 8.1878s3.169 6.9596 3.169 10.644c0 3.6845-1.1884 11.872-1.1884 14.329 0 2.4563 2.7729 26.201 4.3574 32.751 1.5845 6.5502 3.169 6.9596 3.169 8.5971 0 1.6376 3.169 3.2751-2.7729 4.0939s-4.3574-7.369-5.9419-9.0065c-1.5845-1.6376-9.5071 3.2751-11.884-1.2283-2.3768-4.5032 0.79221-9.4159-3.9613-9.4159s1.1884 2.8657-4.7535 3.6845c-5.9419 0.81875-7.5264-4.9127-7.1303 2.047 0.39623 6.9596-2.7729 1.2281-3.169 6.9596-0.39622 5.7314 5.1496 4.9126 1.9806 9.0066-3.169 4.0938-5.9419 2.0469-7.9225-3.6846-1.9806-5.7314-5.1497-13.919-1.5845-13.919 3.5651 0 6.7342 10.235 7.1302 3.2751 0.39622-6.9596 0.79229-6.9596-2.7729-11.053-3.5652-4.0939-2.3767-3.6845-1.5846-9.0065s3.169-10.235-0.79225-9.0066c-3.9613 1.2281-17.826 6.5502-18.618 8.1878-0.79224 1.6376-3.9612 2.8658-4.7535 7.7784-0.79225 4.9127 0 6.1408-1.5845 6.1408s-3.9613-2.4563-3.9613-9.0066c0-6.5502-5.5458-14.738-7.5264-19.651-1.9806-4.9127-15.053-18.013-15.449-20.469-0.39611-2.4564 0-12.282-0.39611-15.557-0.39615-3.2751-1.9806 3.6845-3.5651 6.9596s-3.169 0-6.7342 3.2751c-3.5651 3.2751-2.7729 6.5502-5.5458 8.5972-2.7729 2.0469-7.5264-2.4564-7.5264 0.40938 0 2.8657 4.3574 9.0066 4.3574 9.0066 0 3.6845 1.9806 5.7314-2.3768 6.9596s-6.338-0.40937-9.1109-1.2282c-2.7729-0.81876-3.169-7.369-4.7535-4.9127-1.5845 2.4564 1.5845 8.1878-5.5458 3.6845-7.1303-4.5032-11.488 9.4159-11.488 13.919 0 4.5032-0.79225 13.51-1.1884 19.241-0.39611 5.7314 1.5845 11.053-1.9806 15.147-3.5651 4.0939-7.9225 2.047-8.7148 2.8657-0.79225 0.81876-1.5845-6.5502-1.5845-6.5502s-4.7535 2.4564-3.9613 4.5033c0.79226 2.0469-5.5458-10.235-8.3186-6.9596-2.7729 3.2751-5.1496 9.0065-7.5264 6.9596-2.3768-2.047-3.169 4.5032-4.7535 6.9596-1.5845 2.4563-3.169 10.644-6.7342 12.691-3.5651 2.047-16.637 5.3221-16.241 3.2751 0.39613-2.0469 6.338-9.0065 1.9806-6.5502-4.3574 2.4564-5.5458-2.4563-5.5458-5.7315 0-3.2751 1.1884-4.5032-1.9806-4.0939-3.169 0.40939 1.5845 8.5972-3.5651 1.6376s-8.3187-11.053-8.3187-3.6845c0 7.369 2.7729 8.5972-1.9806 12.691s-7.5264 4.9127-9.1109 1.2281c-1.5845-3.6845-0.39611-3.6845-4.3574-3.6845s-5.1496 1.2282-2.7729 4.5033c2.3768 3.2751 6.338 5.7314 2.3768 6.1408-3.9612 0.40942-3.9612 1.2282-8.3186-2.0469s-11.092 2.8657-13.864 4.5032c-2.7729 1.6376-3.169 1.2282-4.7535-1.6376-1.5845-2.8657-4.3574-3.6844-5.1496-9.0065-0.79226-5.3221-2.7729-8.5972-0.79226-11.053 1.9806-2.4564-2.3768-11.463-3.169-7.7784-0.79225 3.6845-3.5651 2.8658-5.5458 6.1408-1.9806 3.2751-1.9806 2.047-1.9806 6.9596 0 4.9127 2.3768 0.81883 1.1884 7.7784s-0.39615 13.919-3.9613 10.235c-3.5652-3.6845-5.9419-18.013-7.9225-21.288-1.9806-3.2751-0.39611-4.0939 0-9.8254 0.3961-5.7314-2.7729-14.738 0-15.557 2.7729-0.81879-1.9806-10.644-4.7535-13.919-2.7729-3.2751-5.1496-0.8188-3.169-7.369s3.5651-3.2751 1.5845-9.0066c-1.9806-5.7314-5.9419-2.8657-3.9613-8.1878 1.9806-5.322-1.5845-19.329-0.79226-9.0065 0.79226-4.9127-5.1496-4.9127-1.9806-8.5972s9.9032-3.6845 5.9419-6.9596c-3.9613-3.2752-6.7341-10.235-6.7341-10.235s-0.79226 4.0939-1.9806-0.40938c-1.1884-4.5033 0 0 0.79226-6.5502 0.79225-6.5502-2.7729 1.2281 4.3574-8.5972s7.1303-10.235 0.79225-10.644c-6.338-0.40938-4.3574 6.9596-9.9032 3.2751s-10.695-7.7784-7.9225-8.5971c2.7729-0.81876 2.7729 0.40938 2.7729-2.4564 0-2.8657 0.79226-3.2751 1.1884-6.1408 0.39615-2.8657 1.9806-2.8657 2.3768-5.3221 0.39611-2.4563-5.9419-4.0939-8.3187-5.7314-2.3768-1.6376-1.9806-0.8188-6.7341-4.5033s-5.1496-2.8657-4.7535-8.5972c0.39611-5.7314-2.7729-5.7314 0.79225-8.1878 3.5651-2.4563 3.169-2.0469 6.7342-3.6845 3.5651-1.6376 7.9225-4.0939 7.9225-6.5502 0-2.4564-2.7729-2.8657-2.3768-6.1408 0.39615-3.2751-1.9806-8.5972-2.7729-8.5972-0.79225 0 3.5651 2.0469 3.5651-3.2751s0-6.1408-4.7535-7.369c-4.7535-1.2281-8.3187-1.2281-11.092-1.2281-2.7729 0-4.3574 0-9.9032-5.7315-5.5458-5.7314-5.5458-2.8657-13.072-4.0939-7.5264-1.2281-8.3187-3.2751-9.9032-9.0065s-8.7148-10.235-12.28-11.872c-3.5651-1.6376-3.5651-7.369-1.9806-7.369s4.3574-1.6376 5.5458-4.9127 4.3574-4.0939 4.3574-4.0939 3.169-2.4564 3.5651-6.1408c0.39615-3.6845 1.1884-12.691 3.5651-12.282 2.3768 0.40937 0.39615 7.369 3.9613 7.7784 3.5651 0.40938 11.488 3.2751 9.1109 0-2.3768-3.2751-5.1496-2.4563-0.79225-4.9127s11.092-12.282 8.7148-18.013c-2.3768-5.7314-1.1884-9.8253-1.1884-9.8253s2.7729-1.2282 7.1303 2.0469c4.3574 3.2752 1.5845 1.2282 7.5264 0.81881 5.9419-0.40938 8.3187 2.4563 13.072 0.81875 4.7535-1.6376 1.1884-5.322 5.5458-2.8657s5.1496 6.1408 6.7342 0c1.5845-6.1408 6.7342-6.1408 4.3574-7.7784-2.3768-1.6375-3.5651 2.4563-7.9225-1.2282s-5.9419-15.147-7.5264-17.194c-1.5845-2.0469-2.3768 1.2282-5.5458 1.2282s1.5845 1.6376-4.7535 1.6376-6.338-2.0469-9.507-2.8657c-3.169-0.81879-4.7535-0.81879-5.1496-2.4563-0.39611-1.6376-4.3574-2.8657-5.1496-6.1408-0.79225-3.2751-3.9613-5.322-4.7535-7.7784-0.79225-2.4564-0.39615-1.6376-3.5651-3.2751-3.169-1.6376-8.3187-8.5972-7.1303-7.7784z"
  // Offshore Islands
  + "M 270 385 C 275 390, 273 398, 267 398 C 263 393, 265 386, 270 385 Z "
  + "M 248 375 C 253 385, 251 398, 245 398 C 241 388, 243 378, 248 375 Z "
  + "M 285 365 C 288 370, 286 376, 282 376 C 279 370, 281 366, 285 365 Z";

export function BangladeshMap({
  height = 500,
  label = "OVER 60 BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHover(id);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setHover(null);
    }, 250); 
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "transparent", height }}
    >
      <style>{`
        .animate-map {
          fill: #003087 !important;
          stroke: #0047cc !important;
          stroke-width: 1.5px !important;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: yrcDrawMap 3s ease-in-out forwards;
          filter: drop-shadow(0 0 12px rgba(0, 71, 204, 0.6));
        }
        @keyframes yrcDrawMap {
          0% { stroke-dashoffset: 1; fill-opacity: 0; }
          70% { stroke-dashoffset: 0; fill-opacity: 0; }
          100% { stroke-dashoffset: 0; fill-opacity: 1; }
        }
        @keyframes yrcDotEnter {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes yrcDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.8; }
        }
        .yrc-bd-dot {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation:
            yrcDotEnter 400ms ease forwards var(--enter-delay, 2s),
            yrcDotPulse 2s ease-in-out infinite var(--pulse-delay, 2.4s);
        }
        .yrc-bd-trail {
          stroke-dasharray: 6 6;
          opacity: 0;
          animation: yrcDotEnter 400ms ease forwards 2s;
        }
        .yrc-bd-bike {
          opacity: 0;
          animation: yrcDotEnter 400ms ease forwards 2.2s;
        }
      `}</style>

      <div className="relative flex h-full w-full flex-col items-center">
        <div className="relative w-full flex-1 max-w-[800px] flex items-center justify-center">
          
          <svg
            viewBox="0 0 400 500"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Static map injected safely so hover never triggers redraw */}
            <path
              className="animate-map"
              d={BD_OUTLINE}
              pathLength="1"
            />

            {/* Bright Cyan Curved Nationwide Bike Lane */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#00e5ff" 
              strokeOpacity={0.75}
              strokeWidth={2.5}
              strokeDasharray="6 6"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(0, 229, 255, 0.8))" }}
            />

            {/* Dots perfectly aligned inland */}
            {ALL_BRANCHES.map((branch, i) => (
              <g
                key={branch.id}
                className="yrc-bd-dot pointer-events-auto"
                style={
                  {
                    ["--enter-delay" as string]: `${2 + (i % 8) * 0.15}s`,
                    ["--pulse-delay" as string]: `${2.4 + (i % 4) * 0.3}s`,
                    cursor: "pointer",
                  } as React.CSSProperties
                }
                onMouseEnter={() => handleMouseEnter(branch.id)}
                onMouseLeave={handleMouseLeave}
              >
                <circle
                  cx={branch.cx}
                  cy={branch.cy}
                  r={branch.isMain ? 2.5 : 1.2}
                  fill={branch.isMain ? "#e60012" : "#00e5ff"}
                  stroke="#ffffff"
                  strokeWidth={branch.isMain ? 0.8 : 0.4}
                  style={{
                    filter: branch.isMain
                      ? "drop-shadow(0 0 4px rgba(230,0,18,0.9))"
                      : "drop-shadow(0 0 4px rgba(0,229,255,1))",
                  }}
                />
                <circle cx={branch.cx} cy={branch.cy} r={branch.isMain ? 10 : 7} fill="transparent" />
              </g>
            ))}

            {/* Huge, Bright Motorcycle */}
            <g className="yrc-bd-bike" style={{ opacity: 1 }}>
              <g transform="translate(-12,-12)">
                <svg x="0" y="0" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="#e60012" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%", filter: "drop-shadow(0 0 6px rgba(255,255,255,0.7))" }}>
                  <circle cx="5.5" cy="16.5" r="3.5" />
                  <circle cx="18.5" cy="16.5" r="3.5" />
                  <path d="M5.5 16.5h6l3-6h-4" />
                  <path d="M14.5 10.5l4 6" />
                </svg>
                <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#yrc-bike-motion-path" />
                </animateMotion>
              </g>
            </g>
          </svg>

          {/* Dynamic Tooltips */}
          {ALL_BRANCHES.map((m) => {
            const active = hover === m.id;
            return (
              <div
                key={m.id}
                aria-hidden={!active}
                className="absolute"
                style={{
                  left: `${(m.cx / 400) * 100}%`,
                  top: `${(m.cy / 500) * 100}%`,
                  transform: `translate(-50%, calc(-100% - 10px)) translateY(${active ? 0 : 5}px)`,
                  opacity: active ? 1 : 0,
                  transition: "opacity 200ms ease, transform 200ms ease",
                  zIndex: active ? 100 : -1, 
                  pointerEvents: active ? "auto" : "none", 
                }}
                onMouseEnter={() => handleMouseEnter(m.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="rounded-lg bg-white font-sans pointer-events-auto"
                  style={{
                    padding: "8px 12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    color: "#003087",
                    whiteSpace: "nowrap",
                    fontSize: 12,
                    lineHeight: 1.35,
                    border: m.isMain ? "2px solid #e60012" : "1.5px solid #00e5ff",
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 13 }}>{m.name}</div>
                  {m.coord && <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{m.coord}</div>}
                  
                  <a
                    href="https://www.facebook.com/groups/YamahaRidersClubBD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 font-bold transition-transform hover:scale-105"
                    style={{ color: "#0047cc", fontSize: 11 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-2 2-2h2V2.2C16.6 2.1 15.4 2 14 2c-3 0-5 1.8-5 5.2V10H6v4h3v8h4z"/></svg>
                    Join Facebook Group
                  </a>
                </div>
                <div style={{ height: "16px", width: "100%", background: "transparent" }} />
              </div>
            );
          })}
        </div>

        {label ? (
          <div className="mt-6 flex flex-col items-center">
            <span
              className="font-display tracking-wider"
              style={{ color: "#003087", fontSize: 18, lineHeight: 1 }}
            >
              {label}
            </span>
            <span
              aria-hidden
              className="mt-3 block"
              style={{ width: 60, height: 3, backgroundColor: "#e60012" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
