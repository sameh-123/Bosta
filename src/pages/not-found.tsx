import notFound from '/notFound.svg';
export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <img
        src={notFound}
        alt="not found page"
        loading="lazy"
        className="h-full"
      />
      ;
    </div>
  );
}
