import notfoundImg from "/undraw_taken_mshk.svg";

export default function NotFound() {
  return (
    <div className="text-center p-6 h-dvh flex flex-col items-center justify-center">
      <img
        src={notfoundImg}
        alt=""
        className="w-full h-full object-contain max-w-md max-h-96 my-6"
      />
      <h1>404 - Page Not Found</h1>
      <p className="mt-4 text-lg">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
