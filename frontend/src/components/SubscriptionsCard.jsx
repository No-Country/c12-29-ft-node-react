import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";

const SubscriptionsCard = ({ data }) => {
	const dataInLocalStorage = localStorage.getItem("usuario");
	const {email, _id} = JSON.parse(dataInLocalStorage).user
	const parsedUser = JSON.parse(dataInLocalStorage).user

  const handleSubscription = async () => {
		try {
			
			console.log(data)
			// const response = await axios.post("https://c12-29-ft-node-react.onrender.com/api/payments/subscribe",{
			// 	"email": "test_user_370105614@testuser.com",
			// 	"userId":"64c1d6e8311f3bb4359f39eb",
			// 	"subscription": {
			// 		"name": "Premium",
			// 		"price": 10
			// 	}
			// })
			const response = await axios.post("https://c12-29-ft-node-react.onrender.com/api/payments/subscribe",{
				email,
				userId:_id,
				subscription: data
			})
			console.log(response.data.response.init_point);
		} catch (error) {
			console.log(error);
		}
	};
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "300px",
        width: "180px",
        margin: "2em",
        padding: "1em",
      }}
    >
      <CardContent
        sx={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        {data.name === "Premium+" ? (
          <Typography>
            Éste plan cuenta con reuniones ilimitadas, y máximo{" "}
            {data.specialities} especialidades
          </Typography>
        ) : (
          <Typography>
            Éste plan cuenta con {data.meets} reuniones, y máximo{" "}
            {data.specialities} especialidades
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" fontSize={18}>
          ${data.price}
        </Typography>
      </CardContent>
      <CardActions>
        {data.name === "Free" ? null : (
          <Button
            onClick={handleSubscription}
            sx={{
              color: "black",
              background: "#FAFF00",
              "&:hover": { background: "#FAFF00" },
            }}
            size="small"
          >
            Comprar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SubscriptionsCard;
