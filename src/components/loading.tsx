import loader from '/public/loader.svg';
export default function Loading() {
  return (
    <div className="container mx-auto flex items-center justify-center mt-10">
      <object type="image/svg+xml" data={loader} className="w-30">
        loading
      </object>
    </div>
  );
}
