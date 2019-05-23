
const watchState = {
  state: {
    rejectSelectTodayOrYesterday: 1,
    rejectSelectweekOryesLastweek: 1,
  },
  mutations: {
    rejectSelectTodayOrYesterday (state, num) {
      state.rejectSelectTodayOrYesterday = num
    },
    rejectSelectweekOryesLastweek (state, num) {
      state.rejectSelectweekOryesLastweek = num
    },

  }

}

export default watchState
