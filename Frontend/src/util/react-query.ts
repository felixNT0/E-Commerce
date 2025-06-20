import {MutationCache, QueryCache, QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err: any) => {
      if (err?.status === 403 && err?.data?.message) {
        console.log({message: err.data.message, variant: 'error'});
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err: any) => {
      if (err?.data?.message) {
        if (err?.status === 403 || err?.status === 409) {
          console.log({message: err.data.message, variant: 'error'});
        }
      }
    },
  }),
});

export const queryKeys = {
  user: {
    root: [{type: 'user'}],
  },
  wallet: {
    root: [{type: 'wallet'}],
    walletId: [{type: 'walletId'}],
    balance: [{type: 'balance'}],
    recentTransactions: [{type: 'recentTransactions'}],
    enquiry: [{type: 'enquiry'}],
  },
  location: {
    states: [{type: 'states'}],
    lgas: [{type: 'lgas'}],
    allLgas: [{type: 'allLgas'}],
  },
  utilities: {
    crop: [{type: 'crop'}],
    team: [{type: 'team'}],
    expenditure: [{type: 'expenditure'}],
    unit: [{type: 'unit'}],
  },
  products: {
    root: [{type: 'products'}],
    productId: [{type: 'productId'}],
  },
  vendor: {
    root: [{type: 'vendors'}],
    vendorId: [{type: 'vendorId'}],
    vendorAccount: [{type: 'vendorAccount'}],
  },
  orders: {
    root: [{type: 'orders'}],
    orderId: [{type: 'ordersId'}],
    service: [{type: 'service'}],
  },
  notification: {
    root: [{type: 'notification'}],
    notificationId: [{type: 'notificationId'}],
  },
  farmSeason: {
    root: [{type: 'rootFarmSeason'}],
    crop: [{type: 'rootFarmSeasonCrop'}],
    active: [{type: 'rootActiveFarmSeason'}],
    completed: [{type: 'rootCompleteFarmSeason'}],
    activeId: [{type: 'rootActiveFarmSeasonId'}],
    farmSeasonExpenditure: [{type: 'farmSeasonExpenditure'}],
    farmSeasonDetail: (id: string) => [{type: 'farmSeasons'}, id],
  },
  farmVisitation: {
    root: [{type: 'rootFarmVisitation'}],
    farmVisitDetail: (id: string) => [{type: 'farmVisitation'}, id],
  },
  teams: {
    root: [{type: 'teams'}],
    detail: (id: string) => [{type: 'teamsById'}, id],
  },
  farmer: {
    root: [{type: 'farmers'}],
    farmersCount: [{type: 'farmersCount'}],
    farmersDetail: (id: string) => [{type: 'farmersDetail'}, id],
    exportFarmerInfos: (id: string) => [{type: 'exportFarmerInfos'}, id],
  },
  analytics: {
    root: (type: string) => [{type: 'analytics'}, type],
  },
  farm: {
    root: [{type: 'farms'}],
    farmsCount: [{type: 'farmCount'}],
    farmDetail: (id: string) => [{type: 'farmDetail'}, id],
  },
  training: {
    root: [{type: 'trainings'}],
    trainingsCount: [{type: 'trainingCount'}],
    trainingDetail: (id: string) => [{type: 'trainingDetail'}, id],
  },
};
