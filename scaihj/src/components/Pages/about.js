import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Logo from "../Images/Logo.png";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

// const containerStyle = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   textAlign: "center",
//   minHeight: "100vh",
//   justifyContent: "center",
// };

const AboutPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        justifyContent: "center",

        "& > :not(style)": {
          m: 1,
          // width: 128,
          // height: 128,
        },
      }}
    >
      <Paper sx={{ padding: 10 }}>
        <Typography variant="h4" gutterBottom>
          ABOUT US
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          <br />
          주가 상승분을 최상으로 반영하는 미드캡 종목의 주가를 예측합니다.
          <br />
          <br />
          SYNERGYCAP의 차별화된 모델은 기존 주가 예측 모델의 한계를 뛰어넘어,
          <br />
          미드캡 종목이 보유한 업사이드와 대형주를 뛰어넘는 수익률을 추구합니다.
          <br />
          {/* <br />
          미드캡과 이에 따른 대형주의 주가 움직임을 예측하여 투자 수익을
          극대화합니다. */}
          <br />
          <br />
        </Typography>
        <Typography variant="h4" gutterBottom>
          KEY POINTS
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          <br />
          <Typography variant="h6" gutterBottom>
            대형주와 미드캡 주식 대상 선정
          </Typography>
          효과적인 분석 결과를 얻기 위해 다량의 데이터 확보가 가능한 대형주와
          <br />
          이와 연관된 미드캡 주식을 대상으로 선택합니다.
          <br />
          <br />
          <Typography variant="h6" gutterBottom>
            다양한 변수와 시계열 데이터 활용
          </Typography>
          주식의 시가, 종가, 고가, 저가, 거래량, 평균가 등 다양한 변수들과
          <br />
          과거 주식 변화 흐름의 타임 구간을 조정해 최적의 미드캡 주식 변화를
          예측합니다.
          <br />
          <br />
          <Typography variant="h6" gutterBottom>
            데이터 학습과 백테스팅
          </Typography>
          5년치 데이터를 이용하여 모델을 학습하고, 학습한 결과를 통해
          <br />
          지난 10년 동안의 주식 변화를 백테스팅을 통해 검증합니다.
          <br />
          <br />
          <br />
        </Typography>
        <Typography variant="h4" gutterBottom>
          VISIONS
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          <br />
          투자 수익을 극대화하는 PRIVATE 포트폴리오 구성
          <br />
          <br />
          테마 종목 구성을 통한 주가 상승분 최대화 전략 계획
          <br />
          <br />
          <br />
        </Typography>

        <img src={Logo} alt="Logo" style={{ maxWidth: "400px" }} />
      </Paper>
    </Box>
  );
};

export default AboutPage;
