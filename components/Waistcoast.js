import Link from "next/link"
import Image from "next/image"

const Waistcoast = ({href}) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-charcoal/75">
            <div className="bg-beige flex items-center rounded-xl max-w-3xl">
            <div className="relative w-2/3 h-full border-r">
                <Image src='/waistcoat.webp' width={800} height={1200} className="object-cover"/>
            </div>
            <div className="mx-20 text-center">
                <div className="font-editorial text-3xl text-center mb-4">
                        Would you like to add one of our waistcoats to your order?
                </div>
                <div className="flex space-x-3 w-2/3 mx-auto">
                    <Link href={href} className='w-full'><button className="border border-charcoal p-3 text-center text-sm w-full hover:bg-charcoal hover:text-beige">YES</button></Link>
                    <Link href={href} className='w-full'><button className="border border-charcoal p-3 text-center text-sm w-full hover:bg-charcoal hover:text-beige">NO</button></Link>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Waistcoast