import { useEffect, useState, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AlphabeticCaptchaProps {
  onChange: (isValid: boolean) => void;
  onReset?: () => void;
}

const AlphabeticCaptcha = ({ onChange, onReset }: AlphabeticCaptchaProps) => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    setUserInput("");
    onChange(false);
    return text;
  };

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1f2937";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(156, 163, 175, ${Math.random() * 0.5 + 0.2})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.font = "bold 32px Arial";
    ctx.textBaseline = "middle";

    for (let i = 0; i < text.length; i++) {
      const x = 15 + i * 30;
      const y = canvas.height / 2;
      const angle = (Math.random() - 0.5) * 0.4;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const gradient = ctx.createLinearGradient(0, -20, 0, 20);
      gradient.addColorStop(0, "#3b82f6");
      gradient.addColorStop(0.5, "#60a5fa");
      gradient.addColorStop(1, "#93c5fd");
      ctx.fillStyle = gradient;

      ctx.shadowColor = "rgba(59, 130, 246, 0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.fillText(text[i], 0, 0);

      ctx.restore();
    }
  };

  useEffect(() => {
    const text = generateCaptcha();
    drawCaptcha(text);
  }, []);

  useEffect(() => {
    if (captchaText) {
      drawCaptcha(captchaText);
    }
  }, [captchaText]);

  useEffect(() => {
    const isValid = userInput.length > 0 && userInput === captchaText;
    onChange(isValid);
  }, [userInput, captchaText, onChange]);

  const handleRefresh = () => {
    const text = generateCaptcha();
    drawCaptcha(text);
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <canvas
          ref={canvasRef}
          width={200}
          height={60}
          className="border-2 border-gray-600 rounded-lg bg-gray-800"
        />
        <Button
          type="button"
          onClick={handleRefresh}
          variant="outline"
          size="icon"
          className="bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-primary transition-all"
          title="Refresh captcha"
        >
          <RefreshCw className="w-4 h-4 text-primary" />
        </Button>
      </div>
      <Input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter the text shown above"
        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-11"
        autoComplete="off"
      />
    </div>
  );
};

export default AlphabeticCaptcha;
