import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Author } from "../../types"
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AuthorInfo = ({ author }: { author: Author }) => {

    const [expanded, setExpanded] = useState(false);
    const [expandedAwards, setExpandedAwards] = useState(false)

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const handleExpandAwards = () => {
        setExpandedAwards(!expandedAwards);
    };

    const awardMap = new Map();

    for (const award of author.awards) {
        if (!awardMap.has(award.award)) {
            awardMap.set(award.award, 1);
        } else {
            awardMap.set(award.award, awardMap.get(award.award) + 1);
        }
    }

    const awardNames: string[] = [];

    awardMap.forEach((value, key) =>
        value === 1 ? awardNames.push(key) : awardNames.push(`${key} (${value})`)
    );

    return (
        <Card sx={{ backgroundColor: "#1c1f26", color: "white" }}>
            <CardContent>
                {/* Author Name */}
                <Typography
                    variant="h4"
                    fontWeight="bolder"
                    sx={{ marginBottom: "1em" }}
                >
                    {author.name}
                </Typography>

                {/* Author Description */}
                {author.description ? <Typography
                    variant="body1"
                    className="display-linebreak"
                    sx={{ marginBottom: "1em" }}
                >
                    {author.description}
                </Typography> : <></>}

                {/* Expandable Manga List */}
                <Accordion
                    expanded={expanded}
                    onChange={handleExpand}
                    sx={{
                        backgroundColor: "#191a1c",
                        color: "white",
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                        aria-controls="manga-list-content"
                        id="manga-list-header"
                        sx={{
                            marginTop: "20px",
                            "&:hover": {
                                backgroundColor: "#474a4f", // Change color on hover
                            },
                        }}
                    >
                        <Typography>Manga ({author.manga.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {author.manga
                                .slice()
                                // Sort alphabetically
                                .sort((a, b) =>
                                    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                                )
                                .map((manga, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={manga.title} />
                                    </ListItem>
                                ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                {/* Expandable Award List */}
                <Accordion
                    expanded={expandedAwards}
                    onChange={handleExpandAwards}
                    sx={{
                        backgroundColor: "#191a1c",
                        color: "white",
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                        aria-controls="manga-list-content"
                        id="manga-list-header"
                        sx={{
                            marginTop: "20px",
                            "&:hover": {
                                backgroundColor: "#474a4f", // Change color on hover
                            },
                        }}
                    >
                        <Typography>Awards ({author.awards.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {awardNames
                                .slice()
                                // Sort alphabetically
                                .sort((a, b) =>
                                    a.toLowerCase().localeCompare(b.toLowerCase())
                                )
                                .map((award, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={award} />
                                    </ListItem>
                                ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
}

export default AuthorInfo