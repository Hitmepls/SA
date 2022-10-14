import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบหอพัก</h1>
        <h1>Requirements</h1>
        <p className="req">
          ระบบบันทึกข้อมูลผู้เช่าของหอพักแห่งหนึ่ง เป็นระบบที่เจ้าของหอพักสามารถ
          login เข้ามาใช้ระบบเพื่อ บันทึกข้อมูลของผู้เช่า
          โดยระบบสามารถบันทึกข้อมูลของผู้เช่า
          โดยข้อมูลที่เก็บคือข้อมูลส่วนตัวของผู้เช่าซึ่ง ประกอบไปด้วย
          รหัสผู้เช่า ชื่อ-นามสกุล เลขบัตรประชาชน ที่อยู่เป็นต้น
          เมื่อทำการบันทึกข้อมูล ข้อมูลจะถูกจัดเก็บลงฐานข้อมูลของหอพัก
        </p>
      </Container>
    </div>
  );
}
export default Home;
