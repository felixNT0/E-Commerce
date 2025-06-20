export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
  },
  user: {
    root: "/users/self",
    actions: "/users/actions",
    updateUser: (userId: string) => `/users/${userId}`,
    investmentPreferences: (userId: string) =>
      `/users/${userId}/investment-preferences`,
    optionInvestmentPreferences: () => `/users/investment-preferences/options`,
    relationManager: (userId: string) =>
      `/users/${userId}/relationship-manager`,
  },
  blogs: {
    root: "/blogs",
    blogDetail: (slug: string) => `/blogs/${slug}`,
    relatedBlogs: (slug: string) => `/blogs/${slug}/related`,
  },
  comparison: {
    root: "/comparison/cities",
    cityDetail: (id: string) => `/comparison/cities/${id}`,
    compareCity: (base_city_id: string, comparison_city_id: string) =>
      `/comparison/${base_city_id}/compare/${comparison_city_id}`,
    faq: "/comparison/faq",
    info: "/comparison/info",
  },
  developer: {
    root: "/developers",
    developerDetail: (slug: string) => `/developers/${slug}`,
  },
  project: {
    root: "/projects",
    map: "/projects/map",
    projectDetail: (slug: string) => `/projects/${slug}`,
    amenities: (slug: string) => `/projects/${slug}/amenities`,
    unitTypes: (slug: string) => `/projects/${slug}/unit-types`,
    paymentPlans: (slug: string) => `/projects/${slug}/payment-plans`,
    floorPlans: (slug: string) => `/projects/${slug}/floor-plans`,
  },
  area: {
    root: "/locations/neighborhoods",
    areaDetail: (slug: string) => `/locations/neighborhoods/${slug}`,
  },
};
