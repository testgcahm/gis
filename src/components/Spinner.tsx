const Spinner = () => {
    return (
        <div className="relative w-12 h-12 rotate-spinner" >
            {
                [...Array(8)].map((_, i) => (
                    <span
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-primary"
                        style={{
                            top: `${24 + 20 * Math.sin((i * Math.PI) / 4)}px`,
                            left: `${24 + 20 * Math.cos((i * Math.PI) / 4)}px`,
                        }}
                    />
                ))}
            <style>{`
          .rotate-spinner {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
        </div>
    )
};

export default Spinner;