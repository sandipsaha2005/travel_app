import { Image } from "../atoms/Image"
import { Text } from "../atoms/Text"
import { SubscribeForm } from "../organs/SubscribeForm"
import { NewsletterTexts } from "../particles/DataLists"
import groupOfPlus from "../../assets/plusGroup2.png"


const NewsLetter = () => {
    return (
        // <section className="w-full my-32 flex justify-between relative items-start h-[400px]">
        //     <div className="bg-color3/10 w-[30%] h-[70%] self-end rounded-r-xl"></div>
        //     <div className="bg-color3/10 w-[30%] h-[70%] rounded-l-xl"></div>
        //     <div className="w-full bg-color3/5 h-[100%] absolute flex flex-col items-center
        //     justify-center md:gap-16 gap-10 px-5">
        //         <Text as="h1" className="lg:text-3xl md:text-2xl text-xl text-center text-color3/70 lg:w-3/5 w-full">
        //             {NewsletterTexts.firstText}
        //         </Text>
        //         <SubscribeForm />
        //     </div>
        //     <Image image={groupOfPlus} alt="Plus" className="absolute -bottom-16 right-2 h-32" />
        // </section>
        <section class="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48 mt-2">
    <div class="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
        <div class="px-6 py-6 md:px-8 md:py-0">
            <h2 class="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Contact Us For <span class="text-blue-600 dark:text-blue-400 md:text-blue-300">Project</span> Updates</h2>

            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Enter your email and click confirm to send feedback</p>
        </div>
    </div>

    <div class="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
        <form>
            <div class="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input class="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="email" placeholder="Enter your email" aria-label="Enter your email"/>

                <button class="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">Confirm</button>
            </div>
            
        </form>
        
    </div>
</section>
    )
}

export default NewsLetter