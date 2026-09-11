import "@google/model-viewer";
import "./ARViewer.css";

interface Props {
  model: string;
  name: string;
}

export function ARViewer({ model, name }: Props) {
  return (
    <div className="ar-wrapper">
      <model-viewer
        src={model}
        alt={name}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
      >
        <button slot="ar-button" className="ar-launch-button">
          📷 Посмотреть в комнате (AR)
        </button>
      </model-viewer>
    </div>
  );
}