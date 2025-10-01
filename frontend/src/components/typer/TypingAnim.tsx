import { TypeAnimation } from 'react-type-animation';

const TypyingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat with my AI Chatbot🤖',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Always ready to chat',
        1500,
        'Smart answers, simple words',
        1500,
        'Built with OPENAI API',
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize:'60px',color:"white", display: 'inline-block', textShadow:"1px 1px 20px #000"}}
      repeat={Infinity}
    />
  );
};
export default TypyingAnimation;