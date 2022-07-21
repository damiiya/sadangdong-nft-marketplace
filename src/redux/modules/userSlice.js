import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../shared/api";
import { useNavigate } from "react-router-dom";

// export const createAccount = createAsyncThunk(
//   "ACCOUNT_INFO",
//   async (account) => {
//     const navigate= useNavigate();

//     // await axios.post("http://localhost:5000/account", account)
//     // .then((response) => {
//     //     console.log(response.data)
//     //     navigate('/main')

//     // });

//     // const response = await axios.post("http://localhost:5000/account",account)

//     return response.data
//   }
// );

// 해솔님이 가르켜준 코드, 성곰함
export const createAccount = createAsyncThunk(
  "ACCOUNT_INFO",
  async (account) => {
    console.log(account);
    // return await axios({
    //   method: "post",
    //   url: `${serverUrl}/api/account/auth`,
    //   headers: {
    //     "authorization": account
    //   },
    // })
    // .then((response) => {
    //   console.log(response.data)
    // })
    // .error((error)=> {
    //   console.log(error.message)
    // })

    return await axios
      .post(
        `${serverUrl}/api/account/auth`,
        {},
        {
          headers: { authorization: `${account}` },
        }
      )
      .then((response) => {
        localStorage.setItem("auth_token", account);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: { account: "" },
  reducers: [],
  extraReducers: {
    [createAccount.fulfilled]: (state, action) => {
      state.account = action.payload;
    },
  },
});

// 실패 코드
// export const createAccount = createAsyncThunk(
//   "ACCOUNT_INFO",
//   async (account) => {
//     console.log(account);
//     const response = await axios
//       .post("http://localhost:5001/account", { account })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log(response.data);
//     return response.data;
//   }
// );

// const userSlice = createSlice({
//   name: "userSlice",
//   initialState: { account: "" },
//   reducer: [],
//   extraReducers: {
//     [createAccount.fulfilled]: (state, action) => {
//       console.log(action);
//       state.account = action.payload;
//     },
//   },
// });

export default userSlice.reducer;
export const { Account } = userSlice.actions;
