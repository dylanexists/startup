export const APP_MONTH = 7

export const ACCOUNTS_GLOB = {
        "admin_0": {id: "0", email: "admin@email.com", password: "$2b$10$5DYvM/QCeCYOtJqz7U95PueI2mFgP9Tt6cuLdHgxwLy5ojd0IMHbC", role: "Admin", token: "1"},
        "user_1": {id: "user_1", email: "user@email.com", password: "$2b$10$3FHn8ZqxmLnrIkUbjildO.gQ5fxD62GOotAse2xIHYgTcamHGzkF2", role: "User", token: "2"},
    }

export const APARTMENTS_GLOB = {
    "1": {
    id: "1",
    title: "Apt. 101",
    description: "Some information about the apartment",
    features: ["3 roommates", "In-unit washer/dryer", "Dope apartment", "That's all"],
    price: 440,
    linkedUserId: null,
    maintenanceRequested: false,
    technicianSent: false,
  },
  "2": {
    id: "2",
    title: "Apt. 102",
    description: "Stuff about THIS apartment",
    features: ["2 roommates", "Free donkey", "Also dope"],
    price: 500,
    linkedUserId: null,
    maintenanceRequested: false,
    technicianSent: false,
  },
  "3": {
    id: "3",
    title: "Apt. 103",
    description: "Currently filled apartment",
    features: ["Beautiful wallpaper", "Office space", "Comes with a shark tank"],
    price: 445,
    linkedUserId: "user_1",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "4": {
    id: "4",
    title: "Apt. 104",
    price: 440,
    linkedUserId: "user_2",
    maintenanceRequested: true,
    technicianSent: false,
  },
  "5": {
    id: "5",
    title: "Apt. 201",
    price: 460,
    linkedUserId: "user_3",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "6": {
    id: "6",
    title: "Apt. 202",
    price: 460,
    linkedUserId: "user_4",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "7": {
    id: "7",
    title: "Apt. 203",
    description: "A third apartment, just as good",
    features: ["2 roommates", "Widescreen TV", "Lots of storage"],
    price: 480,
    linkedUserId: null,
    maintenanceRequested: false,
    technicianSent: false,
  },
  "8": {
    id: "8",
    title: "Apt. 204",
    price: 485,
    linkedUserId: "user_5",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "9": {
    id: "9",
    title: "Apt. 301",
    price: 515,
    linkedUserId: "user_6",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "10": {
    id: "10",
    title: "Apt. 302",
    price: 500,
    linkedUserId: "user_10",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "11": {
    id: "11",
    title: "Apt. 303",
    price: 525,
    linkedUserId: "user_7",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "12": {
    id: "12",
    title: "Apt. 304",
    price: 520,
    linkedUserId: "user_8",
    maintenanceRequested: false,
    technicianSent: false,
  },
}

export const PAYMENTS_GLOB = {
        // Apt. 103 (Price: 440, History: Months 6, 7)
    "pay_1234": {
        id: "pay_1234",
        linkedApartmentId: "3",
        month: 6,
        amount: 445,
        paidInFull: true,
    },
    "pay_5678": {
        id: "pay_5678",
        linkedApartmentId: "3",
        month: 7,
        amount: 445,
        paidInFull: false,
    },
    // Apt. 104 (Price: 440, History: Months 5, 6, 7)
    "pay_0001": {
        id: "pay_0001",
        linkedApartmentId: "4",
        month: 5,
        amount: 440,
        paidInFull: true,
    },
    "pay_0002": {
        id: "pay_0002",
        linkedApartmentId: "4",
        month: 6,
        amount: 440,
        paidInFull: true,
    },
    "pay_0003": {
        id: "pay_0003",
        linkedApartmentId: "4",
        month: 7,
        amount: 440,
        paidInFull: false,
    },

    // Apt. 201 (Price: 460, History: Months 6, 7)
    "pay_0004": {
        id: "pay_0004",
        linkedApartmentId: "5",
        month: 6,
        amount: 460,
        paidInFull: true,
    },
    "pay_0005": {
        id: "pay_0005",
        linkedApartmentId: "5",
        month: 7,
        amount: 460,
        paidInFull: false,
    },

    // Apt. 202 (Price: 460, History: Months 4, 5, 6, 7)
    "pay_0006": {
        id: "pay_0006",
        linkedApartmentId: "6",
        month: 4,
        amount: 460,
        paidInFull: true,
    },
    "pay_0007": {
        id: "pay_0007",
        linkedApartmentId: "6",
        month: 5,
        amount: 460,
        paidInFull: true,
    },
    "pay_0008": {
        id: "pay_0008",
        linkedApartmentId: "6",
        month: 6,
        amount: 460,
        paidInFull: true,
    },
    "pay_0009": {
        id: "pay_0009",
        linkedApartmentId: "6",
        month: 7,
        amount: 460,
        paidInFull: false,
    },

    // Apt. 204 (Price: 485, History: Months 3, 4, 5, 6, 7)
    "pay_0010": {
        id: "pay_0010",
        linkedApartmentId: "8",
        month: 3,
        amount: 485,
        paidInFull: true,
    },
    "pay_0011": {
        id: "pay_0011",
        linkedApartmentId: "8",
        month: 4,
        amount: 485,
        paidInFull: true,
    },
    "pay_0012": {
        id: "pay_0012",
        linkedApartmentId: "8",
        month: 5,
        amount: 485,
        paidInFull: true,
    },
    "pay_0013": {
        id: "pay_0013",
        linkedApartmentId: "8",
        month: 6,
        amount: 485,
        paidInFull: true,
    },
    "pay_0014": {
        id: "pay_0014",
        linkedApartmentId: "8",
        month: 7,
        amount: 485,
        paidInFull: false,
    },

    // Apt. 301 (Price: 515, History: Months 5, 6, 7)
    "pay_0015": {
        id: "pay_0015",
        linkedApartmentId: "9",
        month: 5,
        amount: 515,
        paidInFull: true,
    },
    "pay_0016": {
        id: "pay_0016",
        linkedApartmentId: "9",
        month: 6,
        amount: 515,
        paidInFull: true,
    },
    "pay_0017": {
        id: "pay_0017",
        linkedApartmentId: "9",
        month: 7,
        amount: 515,
        paidInFull: false,
    },

    // Apt. 302 (Price: 500, History: Months 6, 7)
    "pay_0018": {
        id: "pay_0018",
        linkedApartmentId: "10",
        month: 6,
        amount: 500,
        paidInFull: true,
    },
    "pay_0019": {
        id: "pay_0019",
        linkedApartmentId: "10",
        month: 7,
        amount: 500,
        paidInFull: false,
    },

    // Apt. 303 (Price: 525, History: Months 4, 5, 6, 7)
    "pay_0020": {
        id: "pay_0020",
        linkedApartmentId: "11",
        month: 4,
        amount: 525,
        paidInFull: true,
    },
    "pay_0021": {
        id: "pay_0021",
        linkedApartmentId: "11",
        month: 5,
        amount: 525,
        paidInFull: true,
    },
    "pay_0022": {
        id: "pay_0022",
        linkedApartmentId: "11",
        month: 6,
        amount: 525,
        paidInFull: true,
    },
    "pay_0023": {
        id: "pay_0023",
        linkedApartmentId: "11",
        month: 7,
        amount: 525,
        paidInFull: false,
    },

    // Apt. 304 (Price: 520, History: Months 5, 6, 7)
    "pay_0024": {
        id: "pay_0024",
        linkedApartmentId: "12",
        month: 5,
        amount: 520,
        paidInFull: true,
    },
    "pay_0025": {
        id: "pay_0025",
        linkedApartmentId: "12",
        month: 6,
        amount: 520,
        paidInFull: true,
    },
    "pay_0026": {
        id: "pay_0026",
        linkedApartmentId: "12",
        month: 7,
        amount: 520,
        paidInFull: false,
    }
}