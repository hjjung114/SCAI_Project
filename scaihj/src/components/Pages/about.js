import * as React from "react";
import Typography from "@mui/material/Typography";
import Logo from "../Images/Logo.png";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "@fontsource/roboto";

const AboutPage = () => {
  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        justifyContent: "center",
        // borderRadius: "20px",

        "& > :not(style)": {
          m: 1,
          // width: 128,
          // height: 128,
        },
      }}
    >
      <Paper
        sx={{
          padding: 10,
          backgroundColor: "#F7F7F7",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", color: "#089c8d" }}
        >
          ABOUT US
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontFamily: "roboto" }}
        >
          <br />
          미드캡은 보통 해당 섹터의 업사이드에서 대형주보다 높은 수익률을
          추구합니다.
          <br />
          <br />
          SYNERGYCAP의 차별화된 모델은 미드캡과 그에 속한 대형주의 주가에 따라
          <br />
          미래 주가 흐름을 예측하여 대형주를 뛰어넘는 수익률을 추구합니다.
        </Typography>

        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", color: "#089c8d" }}
        >
          KEY POINTS
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          <br />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            대형주와 미드캡 주식 대상 선정
          </Typography>
          효과적인 분석 결과를 위해 다량의 데이터 확보가 가능한 대형주와
          <br />
          이와 연관된 미드캡 주식을 대상으로 선정합니다.
          <br />
          <br />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            다양한 변수와 시계열 데이터 활용
          </Typography>
          주식의 시가, 종가, 고가, 저가, 거래량, 평균가 등 다양한 변수들과
          <br />
          과거 주식 변화 흐름의 타임 구간을 조정해 최적의 미드캡 주가를
          예측합니다.
          <br />
          <br />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            데이터 학습과 백테스팅
          </Typography>
          5년치 데이터를 이용하여 모델을 학습하고, 학습한 결과를 통해
          <br />
          지난 10년 동안의 주식 변화를 백테스팅을 통해 검증합니다.
        </Typography>
        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", color: "#089c8d" }}
        >
          VISIONS
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontFamily: "roboto" }}
        >
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            미드캡 종목 주가 예측장
          </Typography>
          한 섹터와 테마 종목 구성을 통한 주가 상승분 최대화 전략 계획
          <br />
          <br />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            미드캡 종목 주가 예측장
          </Typography>
          투자 수익을 극대화하는 PRIVATE한 포트폴리오 구성
          <br />
        </Typography>
        {/* <Divider /> */}
        {/* <br /> */}
      </Paper>
      <img
        src={Logo}
        alt="Logo"
        style={{ maxWidth: "400px", borderRadius: "10px" }}
      />
    </Box>
  );
};

export default AboutPage;
