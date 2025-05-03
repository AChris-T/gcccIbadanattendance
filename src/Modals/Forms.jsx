import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Forms = () => {
  return (
    <div className="md:mt-[-100px] mt-[-30px] px-4 mb-5">
      <h5
        style={{ fontFamily: "Lobster Two, sans-serif" }}
        className="text-[#ec3538] text-center font-bold"
      >
        share with us
      </h5>
      <h3 className="w-full flex mb-5 justify-center text-[#757575]  font-semibold text-[32px] leading-10 text-center ">
        How can we help
      </h3>

      <div
        data-aos="fade-up"
        data-aos-delay="0"
        className="md:px-[200px] flex gap-2 flex-col"
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            style={{ fontWeight: "600", fontSize: "20px" }}
          >
            TESTIMONY FORM
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              title="Google Form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSeO-WyGS4qovmJl8qABZnvzyvlOIZZffrIVym8ebaZxQnCcLw/viewform?usp=sf_link"
              width="740"
              height="800"
            >
              Loading…
            </iframe>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            style={{ fontWeight: "600", fontSize: "20px" }}
          >
            PRAYER FORM
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              title="Google Form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdvaPPujgUqxBRCH0uw_0g9dXUEL-LksYLUysAns6PK-beWzQ/viewform"
              width="740"
              height="800"
            >
              Loading…
            </iframe>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            style={{ fontWeight: "600", fontSize: "20px" }}
          >
            QUESTION FORM
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              title="Google Form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdxYISVjD717jhbA9VkZqnRhBWsHYzJkBUyv1yK-nQv0xQeFA/viewform?pli=1"
              width="740"
              height="800"
            >
              Loading…
            </iframe>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Forms;
