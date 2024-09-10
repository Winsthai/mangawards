import { Box, Card, CardContent, Typography } from "@mui/material"
import { BasicAward } from "../../types"

const AwardCard = ({ award }: { award: BasicAward }) => {

    return (
        <Box
            sx={{
                width: "100%", // Make it full width
                maxWidth: "100%", // Ensure it doesn't exceed the container's width
                mx: "auto", // Horizontally center the box
            }}
        >
            {/* Container Box */}
            <Card
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#1c1f26",
                    color: "white",
                    marginTop: "16px",
                    padding: "16px 0 16px 0",
                    justifyContent: "space-between"
                }}
            >
                <CardContent sx={{ padding: 0, marginLeft: "3%" }}>
                    <Typography variant="h6" fontWeight="bold">{award.award}</Typography>
                </CardContent>
                <CardContent sx={{ padding: 0, marginLeft: "3%" }}>
                    {award.sponsor ? <Typography>{award.sponsor}</Typography> : <></>}
                </CardContent>
                <CardContent sx={{ padding: 0, marginLeft: "3%" }}>
                    {award.country ? <Typography>{award.country}</Typography> : <></>}
                </CardContent>
            </Card>
        </Box>
    )
}

export default AwardCard