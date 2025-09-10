import { useEffect } from 'react';
import img5 from '../../assets/Images/aboutImgs.jpg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Formspage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  return (
    <div className="relative px-10 flex flex-col mt-[100px] w-full gap-16 overflow-hidden ">
      <div className="relative h-full ">
        {/*         <h2 className="text-2xl font-semibold text-white">Forms</h2>
         */}{' '}
      </div>

      <div className="absolute md:h-[450px] bg-cover h-[300px] w-full   text-[white] flex  justify-center flex-col items-center"></div>
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
            style={{ fontWeight: '600', fontSize: '20px' }}
          >
            TESTIMONY FORM
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
            style={{ fontWeight: '600', fontSize: '20px' }}
          >
            PRAYER FORM
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
            style={{ fontWeight: '600', fontSize: '20px' }}
          >
            QUESTION FORM
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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

export default Formspage;
