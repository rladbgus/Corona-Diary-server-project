const { Content } = require("../../models");
let axios = require("axios");
//env 파일에서 serviceKey를 가져옵니다.
const path = require("path");
require("dotenv").config(path.join(__dirname, "../../", "env"));

module.exports = {
  get: async (req, res) => {
    try {
      //정부 데이터 API 요청에 필요한 데이터들 입니다.
      const url =
        "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson";
      const serviceKey = process.env.SERVICEKEY;
      const pageNo = 1;
      const numOfRows = 10;

      //today로 시간을 맞추기 위함.(20200918)
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      today = yyyy + mm + dd;
      const startCreateDt = today; //today
      const endCreateDt = today; //today

      // axios get요청으로 url을 적어주고 응답을 받아옵니다.
      const response = await axios.get(
        `${url}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&startCreateDt=${startCreateDt}&endCreateDt=${endCreateDt}`,
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      // 응답에서 정보를 받아옵니다.
      const {
        stateDt,
        stateTime,
        decideCnt,
        clearCnt,
        examCnt,
        careCnt,
        deathCnt,
      } = response.data.response.body.items.item;
      // 정보를 coronaData객체에 담습니다.
      const coronaData = {
        stateDt,
        stateTime,
        decideCnt,
        clearCnt,
        examCnt,
        careCnt,
        deathCnt,
      };
      // content를 날짜 역순으로 6개만 찾습니다.
      const contentList = await Content.findAll({
        attributes: ["id", "title", "text", "createdAt"],
        order: [["createdAt", "DESC"]],
        limit: 6,
      });
      res.status(200).send({ contentList, coronaData });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
