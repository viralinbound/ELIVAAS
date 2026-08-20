
/**
 * VIRAL VILLAS — ADVANCED REALTIME DATA STORE & VILLA PASSPORT ENGINE
 */
(function() {
  const DEFAULT_CUSTOM_VILLAS = [
    {
      id: "prop_custom_101",
      name: "Solitude Waterfront Haven • 4 BHK",
      city: "North Goa",
      location: "Candolim, Goa",
      bhk: 4,
      guests: 10,
      price: 52000,
      rating: 4.95,
      brand: "SIGNATURE",
      img: "images/P1038840_003bdc3df0.jpg",
      amenities: ["Private Pool", "Riverfront View", "Private Chef", "Wifi", "Lawn"],
      hostName: "Rajesh Singhal",
      hostPhone: "+91 98200 11223",
      status: "Live",
      registeredAt: "2026-08-15"
    }
  ];

  const DEFAULT_BOOKINGS = [
    {
      id: "VV-9842",
      guestName: "Vikram Mehta",
      guestPhone: "+91 98201 44512",
      guestEmail: "vikram.mehta@gmail.com",
      villaId: "prop_CpJCF01fl3kUM1",
      villaName: "Valiyaveetil Mansion • 5 BHK",
      villaCity: "Kochi, Kerala",
      villaImg: "images/P1038840_003bdc3df0.jpg",
      checkIn: "2026-08-24",
      checkOut: "2026-08-28",
      nights: 4,
      guests: 8,
      totalAmount: 143628,
      status: "Confirmed",
      paymentMethod: "Visa Infinite Credit Card",
      specialNotes: "High-protein vegan meal plan requested for family.",
      createdAt: "2026-08-18T10:30:00Z"
    },
    {
      id: "VV-9841",
      guestName: "Pooja & Sanjay K.",
      guestPhone: "+91 99302 88120",
      guestEmail: "pooja.sanjay@outlook.com",
      villaId: "prop_DStIgQsV8ANNcS",
      villaName: "Meraki Villa • 5 BHK",
      villaCity: "Lonavala, Maharashtra",
      villaImg: "images/DSC_8885_HDR_a2a8f849fc.jpg",
      checkIn: "2026-09-01",
      checkOut: "2026-09-04",
      nights: 3,
      guests: 12,
      totalAmount: 253065,
      status: "Confirmed",
      paymentMethod: "Kotak Net Banking",
      specialNotes: "50th Birthday celebration setup by the pool.",
      createdAt: "2026-08-19T14:15:00Z"
    },
    {
      id: "VV-9840",
      guestName: "KPMG Leadership Team",
      guestPhone: "+91 98100 77231",
      guestEmail: "kpmg.india@corp.com",
      villaId: "prop_s5XE8tWKRh6NQi",
      villaName: "Mountain Creek Retreat • 7 BHK",
      villaCity: "Udaipur, Rajasthan",
      villaImg: "images/DJI_20260303185046_0182_D_a126714879.jpg",
      checkIn: "2026-09-15",
      checkOut: "2026-09-18",
      nights: 3,
      guests: 18,
      totalAmount: 272130,
      status: "Pending",
      paymentMethod: "Corporate Bank Transfer",
      specialNotes: "Projector setup in gazebo and barbecue dinner on Day 2.",
      createdAt: "2026-08-20T09:00:00Z"
    }
  ];

  const DEFAULT_INQUIRIES = [
    {
      id: "INQ-104",
      type: "Destination Wedding",
      clientName: "Rohan & Ananya Malhotra",
      contact: "+91 98110 54321",
      email: "rohan.ananya@gmail.com",
      villaName: "Mountain Creek Retreat",
      villaId: "prop_s5XE8tWKRh6NQi",
      location: "Udaipur, Rajasthan",
      guests: 120,
      dates: "Dec 10–14, 2026",
      budget: "₹18,00,000",
      status: "New Lead",
      origin: "event.html",
      createdAt: "2026-08-20T08:30:00Z"
    },
    {
      id: "INQ-103",
      type: "Corporate Offsite",
      clientName: "Zomato Product Team",
      contact: "+91 98711 22334",
      email: "offsite@zomato.com",
      villaName: "Solitude Waterfront Haven",
      villaId: "prop_custom_101",
      location: "Goa (North)",
      guests: 35,
      dates: "Oct 05–08, 2026",
      budget: "₹6,50,000",
      status: "Proposal Sent",
      origin: "corporate-offsite.html",
      createdAt: "2026-08-19T16:00:00Z"
    },
    {
      id: "INQ-102",
      type: "Milestone Birthday",
      clientName: "Kavita Singhania (50th)",
      contact: "+91 99204 11234",
      email: "kavita.s@gmail.com",
      villaName: "Meraki Villa",
      villaId: "prop_DStIgQsV8ANNcS",
      location: "Lonavala",
      guests: 40,
      dates: "Nov 02–04, 2026",
      budget: "₹4,00,000",
      status: "Contacted",
      origin: "birthday.html",
      createdAt: "2026-08-19T11:20:00Z"
    }
  ];

  const DEFAULT_PROMOS = [
    { code: "VISA2PLUS1", title: "Visa Infinite 3 for 2", discountType: "percentage", discountVal: 33, minBooking: 40000, status: "Active" },
    { code: "KOTAK10", title: "Kotak 10% Instant Off", discountType: "percentage", discountVal: 10, minBooking: 25000, status: "Active" },
    { code: "VIRAL50", title: "Viral Luxury Special 15%", discountType: "percentage", discountVal: 15, minBooking: 30000, status: "Active" }
  ];

  window.ViralStore = {
    // 1. Registered Custom Villas
    getCustomVillas: function() {
      const stored = localStorage.getItem('vv_custom_villas');
      if (!stored) {
        localStorage.setItem('vv_custom_villas', JSON.stringify(DEFAULT_CUSTOM_VILLAS));
        return DEFAULT_CUSTOM_VILLAS;
      }
      try { return JSON.parse(stored); } catch(e) { return DEFAULT_CUSTOM_VILLAS; }
    },
    saveCustomVillas: function(list) {
      localStorage.setItem('vv_custom_villas', JSON.stringify(list));
      window.dispatchEvent(new Event('vv_villas_updated'));
    },
    registerNewVilla: function(v) {
      const list = this.getCustomVillas();
      v.id = 'prop_custom_' + Math.floor(1000 + Math.random() * 9000);
      v.rating = 4.9;
      v.registeredAt = new Date().toISOString().split('T')[0];
      v.status = v.status || 'Live';
      list.unshift(v);
      this.saveCustomVillas(list);
      return v;
    },

    // 2. Bookings
    getBookings: function() {
      const stored = localStorage.getItem('vv_bookings');
      if (!stored) {
        localStorage.setItem('vv_bookings', JSON.stringify(DEFAULT_BOOKINGS));
        return DEFAULT_BOOKINGS;
      }
      try { return JSON.parse(stored); } catch(e) { return DEFAULT_BOOKINGS; }
    },
    saveBookings: function(bookings) {
      localStorage.setItem('vv_bookings', JSON.stringify(bookings));
      window.dispatchEvent(new Event('vv_bookings_updated'));
    },
    addBooking: function(booking) {
      const bookings = this.getBookings();
      booking.id = 'VV-' + Math.floor(1000 + Math.random() * 9000);
      booking.createdAt = new Date().toISOString();
      booking.status = booking.status || 'Pending';
      bookings.unshift(booking);
      this.saveBookings(bookings);
      return booking;
    },
    updateBookingStatus: function(id, newStatus) {
      const bookings = this.getBookings();
      const b = bookings.find(item => item.id === id);
      if (b) {
        b.status = newStatus;
        this.saveBookings(bookings);
        return true;
      }
      return false;
    },

    // 3. Villa-Specific History & Inquiries
    getVillaGuestHistory: function(villaSearchKey) {
      const allBookings = this.getBookings();
      const key = (villaSearchKey || '').toLowerCase();
      return allBookings.filter(b => 
        (b.villaName && b.villaName.toLowerCase().includes(key)) ||
        (b.villaId && b.villaId.toLowerCase().includes(key))
      );
    },
    getVillaInquiries: function(villaSearchKey) {
      const allInqs = this.getInquiries();
      const key = (villaSearchKey || '').toLowerCase();
      return allInqs.filter(iq => 
        (iq.villaName && iq.villaName.toLowerCase().includes(key)) ||
        (iq.location && iq.location.toLowerCase().includes(key))
      );
    },

    // 4. Inquiries
    getInquiries: function() {
      const stored = localStorage.getItem('vv_inquiries');
      if (!stored) {
        localStorage.setItem('vv_inquiries', JSON.stringify(DEFAULT_INQUIRIES));
        return DEFAULT_INQUIRIES;
      }
      try { return JSON.parse(stored); } catch(e) { return DEFAULT_INQUIRIES; }
    },
    saveInquiries: function(inquiries) {
      localStorage.setItem('vv_inquiries', JSON.stringify(inquiries));
      window.dispatchEvent(new Event('vv_inquiries_updated'));
    },
    addInquiry: function(inq) {
      const list = this.getInquiries();
      inq.id = 'INQ-' + Math.floor(100 + Math.random() * 900);
      inq.createdAt = new Date().toISOString();
      inq.status = inq.status || 'New Lead';
      list.unshift(inq);
      this.saveInquiries(list);
      return inq;
    },
    updateInquiryStatus: function(id, newStatus) {
      const list = this.getInquiries();
      const item = list.find(x => x.id === id);
      if (item) {
        item.status = newStatus;
        this.saveInquiries(list);
        return true;
      }
      return false;
    },

    // 5. Promos
    getPromos: function() {
      const stored = localStorage.getItem('vv_promos');
      if (!stored) {
        localStorage.setItem('vv_promos', JSON.stringify(DEFAULT_PROMOS));
        return DEFAULT_PROMOS;
      }
      try { return JSON.parse(stored); } catch(e) { return DEFAULT_PROMOS; }
    },
    savePromos: function(promos) {
      localStorage.setItem('vv_promos', JSON.stringify(promos));
      window.dispatchEvent(new Event('vv_promos_updated'));
    },
    addPromo: function(promo) {
      const list = this.getPromos();
      list.unshift(promo);
      this.savePromos(list);
      return promo;
    }
  };

  // Init
  ViralStore.getCustomVillas();
  ViralStore.getBookings();
  ViralStore.getInquiries();
  ViralStore.getPromos();
})();
