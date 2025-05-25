import ReactPaginate from "react-paginate";

const Pagination: React.FC<{
  pageCount: number;
  onPageChange: (selected: number) => void;
  forcePage?: number;
}> = ({ pageCount, onPageChange, forcePage }) => {
  return (
    <div className="w-full flex justify-center pt-8">
      <ReactPaginate
        previousLabel="←"
        nextLabel="→"
        breakLabel="..."
        pageCount={pageCount}
        forcePage={forcePage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(e) => onPageChange(e.selected)}
        containerClassName="flex gap-2 flex-wrap"
        pageClassName="rounded-md bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition-colors"
        pageLinkClassName="px-3 py-1 block"
        previousClassName="rounded-md bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition-colors"
        previousLinkClassName="px-3 py-1 block"
        nextClassName="rounded-md bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition-colors"
        nextLinkClassName="px-3 py-1 block"
        breakClassName="text-zinc-500 text-sm px-2 py-1"
        activeClassName="bg-gradient-to-r from-purple-600 to-pink-600 font-semibold"
        disabledClassName="opacity-50 pointer-events-none"
      />
    </div>
  );
};

export default Pagination;
