import logoUI from "../../assets/universitas-indonesia.png";

const About = () => {


    return (
        <>
            <div className="flex flex-col ">
                <p className="text-center text-black text-lg lg:text-xl font-sans font-medium tracking-wide">
                    Direktorat Operasi dan Pemeliharaan Fasilitas Universitas Indonesia
                </p>

                <br></br>

                <img src={logoUI} className="w-1/4 self-center"></img>

                <br></br>
                <br></br>

                <p className="text-center text-black text-xl fonr-sans font-medium">Tim Pengembang</p>

                <br></br>

                <div className="flex flex-row justify-center space-x-5">
                    <div className="">
                        <p className="text-left text-black text-md md:text-lg font-sans font-normal">Ariq Pradipa Santoso</p>
                        <p className="text-left text-black text-md md:text-lg font-sans font-normal">Muhammad Naufal Faza</p>
                        <p className="text-left text-black text-md md:text-lg font-sans font-normal">Yehezkiel Jonatan</p>
                    </div>
                    <div className="">
                        <p className="text-right text-black text-md md:text-lg font-sans font-normal">Teknik Komputer</p>
                        <p className="text-right text-black text-md md:text-lg font-sans font-normal">Teknik Komputer</p>
                        <p className="text-right text-black text-md md:text-lg font-sans font-normal">Teknik Komputer</p>
                    </div>
                </div>




            </div>

        </>
    );
};

export default About;
