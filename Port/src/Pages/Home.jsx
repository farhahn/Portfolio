import { Box, Button,  Flex, Heading, HStack, Link, Tooltip, Image, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Aos from 'aos';
import 'aos/dist/aos.css'


import { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoCloudDownload } from 'react-icons/go'
import { FaPhoneAlt } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

import { projects, skills } from '../Utils/data';

import ProjectCard from '../Components/Card';
import Svg1 from '../Components/Svg1';
import Svg2 from '../Components/Svg2';
import Svg3 from '../Components/Svg3';
import Slider from 'react-slick';
import Resume from '../Resume/Mo-Farhan-Resume.pdf'

const Home = () => {

    const form = useRef();
    const toast = useToast()

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: matchMedia("(max-width: 425px)").matches ? 1 : matchMedia("(max-width: 1024px)").matches ? 2 : 3,
        slidesToScroll: 1,
    };

    useEffect(() => {
        // * it's from Aos library to to use scroll designing
        Aos.init()
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_SERVICE_TEMPLATE, form.current, process.env.REACT_APP_SERVICE_SECRET).then((result) => {

            toast({
                position: 'top-right',
                title: 'Email Sent ✔',
                description: `Thank You ${form.current.from_name.value.split(" ")[0]} for the message!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            form.current.reset();
        }, (error) => {
            console.log(error.text);
            toast({
                position: 'top-right',
                title: 'Email Not sent.',
                description: "There is some error",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        });;

    };

    return (
        <Box>
            <Box id='home'>
                <Flex flexDirection={['column-reverse', 'column-reverse', 'row']} m="auto" justifyContent="space-around" alignItems="center" h="100%">
                    <Box data-aos="fade-down">
                        <Heading>Hey! <span className='themeText'>I'm</span></Heading>
                        <Box className='content'>
                            <Heading fontSize="3.3em" className='text' data-text="Mo Farhan"><span className='themeText'>Mo Farhan</span></Heading>
                        </Box>
                        <Text>Am a software Developer passionate and experienced in building Web applications.</Text>
                        <HStack className='hireMe' onClick={() => { window.open("https://drive.google.com/file/d/14Ha3PNpYa2z4rEbgghlRLY6xr28Vltmy/view?usp=sharing", '_blank') }}>
                            <a href={Resume} download="Mo-Farhan-Resume">
                                <Button>Resume <GoCloudDownload /></Button>
                            </a>
                        </HStack>
                    </Box>
                    <Box data-aos="fade-down">
                        <Svg1 />
                    </Box>
                </Flex>
            </Box>

            {/* About me */}

            <Box id="aboutMe">
                <Heading>About <span className='themeText'>me</span></Heading>
                <Flex flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']} alignItems="center" h="100%">
                    <div data-aos="fade-right">
                        <Svg3 />
                    </div>

                    <Flex data-aos="fade-left">
                        <Flex w="100%" gap="10%" justifyContent="center">
                            <Image
                                borderRadius='full'
                                boxSize='250px'
                                src='/portfolio-profile-pic.png'
                                alt='Atanu Karmakar Avatar' />
                            <Svg3 />
                        </Flex>

                        <Box>
                            <Text>An ambitious and self-motivated webdeveloper with a considerable technical skill who possesses self-discipline and ability to work with minimum of super vision.Able to play a key role in website development to ensure maximum accessibility,user experience and usability.A  quick-learner who can absorb new ideas and can communicate clearly and effectively. </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* Technical Skills section */}
            <Box id="skills">
                <Heading>
                    Technical
                    <span className="themeText"> Skills</span>
                </Heading>
                <Flex className='skills'>
                    <Flex>
                        <Heading size="lg">Front<span className='themeText'>end</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "frontend").map(skill => <Box
                                    key={skill.id}
                                    className="skill"
                                    data-aos="zoom-in-up">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                    <Flex>
                        <Heading size="lg">Back<span className='themeText'>end</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "backend").map(skill => <Box
                                    key={skill.id}
                                    className="skill"
                                    data-aos="zoom-in-down">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                    <Flex>
                        <Heading size="lg">Platforms <span className='themeText'>& Tools</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "platform").map(skill => <Box
                                    key={skill.id} className="skill"
                                    data-aos="zoom-in">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                </Flex>
            </Box>


            {/* show projects */}
            <Box id="projects">
                <Heading textAlign="center">Featured <span className='themeText'>Projects</span></Heading>
                <Slider {...settings}>
                    {
                        projects.map((project, i) => <ProjectCard key={i} {...project} />)
                    }
                </Slider>
            </Box>


            


            {/* Contact me */}
            <Box id='contactMe'>
                <Heading textAlign="center">Contact <span className='themeText'>Me</span></Heading>
                <Flex flexDirection={["column", "column", "column", "row"]} alignItems="center">

                    <Box>
                        <Svg2 />
                    </Box>


                    <Box className='form-section'>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className='inputBox'>
                                <input type="text" name="from_name" required />
                                <span>Full Name</span>
                            </div>
                            <div className='inputBox'>
                                <input type="email" name="from_mail" required />
                                <span>Email</span>
                            </div>
                            <div>
                                <textarea placeholder='Message 📧' name="message" />
                            </div>
                            <input type="submit" value="Send Message" />
                        </form>
                        <Flex className='contact-info'>
                            <HStack>
                                <SiGmail color="#e34133" />
                                <Text>mdf0786456@gmail.com</Text>
                            </HStack>
                            <HStack>
                                <FaPhoneAlt color="#00a14f" />
                                <Text>+91 6394330391</Text>
                            </HStack>
                        </Flex>
                        <Flex gap={["10px", "20px", "20px", "40px"]}>
                            <Link href='https://wa.me/916394330391' target="_blank">
                                <Tooltip label='+91 6394330391'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://brandlogos.net/wp-content/uploads/2018/10/whatsapp-logo.png" alt='Whatsapp brand logo'/>
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href='https://www.linkedin.com/in/mo-farhan786/' target="_blank">
                                <Tooltip label='Mo-Farhan'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://openvisualfx.com/wp-content/uploads/2019/10/linkedin-icon-logo-png-transparent.png" alt='Linkedin brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href="https://github.com/farhahn" target="_blank">
                                <Tooltip label='farhahn'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt='Github brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href="mailto:mdf0786456@gmail.com" target="_blank">
                                <Tooltip label='mdf0786456@gmail.com'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png" alt='Gmail brand logo' />
                                        </Box>
                                    </Box >
                                </Tooltip>
                            </Link>
                        </Flex >
                    </Box >
                </Flex >
            </Box >

            {/* footer */}
            <Flex id='footer'>
                <Text>© Portfolio by Mo Farhan. | All rights reserved.</Text>
                <Text>Made with 💖 by Farhan</Text>
            </Flex>
        </Box >
    )
}

export default Home