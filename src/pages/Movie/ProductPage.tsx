const ProductPage: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="bg-red-500 text-white text-4xl font-bebas">
        🚀 Tailwind is finally working!
      </div>
      <div className="col-12">
        <h5 className="card-title">Product Name</h5>
        <p className="card-text text-muted">
          This is a short description of the product. It's simple and clean.
        </p>
        <a href="#" className="">
          View Details
        </a>
      </div>
    </div>
  );
};

export default ProductPage;
