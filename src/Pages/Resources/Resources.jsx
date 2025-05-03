import { useEffect, useState } from "react";
import axios from "axios";

const BOT_TOKEN = "6723538332:AAHjYs1Srmca76b4J8kpHOF_eNC3ORSRGaI";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const Resources = () => {
  const [audioMessages, setAudioMessages] = useState([]);

  useEffect(() => {
    const fetchAudioMessages = async () => {
      try {
        // Fetch updates from Telegram
        const response = await axios.get(`${TELEGRAM_API_URL}/getUpdates`);
        const messages = response.data.result;
        const audioMessages = messages
          .filter((msg) => msg.message && msg.message.audio)
          .map((msg) => msg.message.audio);

        // Fetch file URLs for each audio message
        const audioFiles = await Promise.all(
          audioMessages.map(async (audio) => {
            const fileResponse = await axios.get(
              `${TELEGRAM_API_URL}/getFile?file_id=${audio.file_id}`
            );
            const filePath = fileResponse.data.result.file_path;
            return {
              ...audio,
              fileUrl: `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`,
            };
          })
        );

        setAudioMessages(audioFiles);
      } catch (error) {
        console.error("Error fetching audio messages:", error);
      }
    };

    fetchAudioMessages();
  }, []);

  return (
    <div className="App">
      <h1>Telegram Audio Messages</h1>
      <ul>
        {audioMessages.map((audio, index) => (
          <li key={index}>
            <audio controls>
              <source src={audio.fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <br />
            <a href={audio.fileUrl} download={`audio_${index + 1}.ogg`}>
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
