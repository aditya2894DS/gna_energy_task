import '../style/Footer.css';

export default function Footer(){
    return(
        <>
        <div className="footer-container">
            <div className="column-1 footer-col">
                <p className="heading">Contact us</p>
                <p className="tollfree">Toll free customer care</p>
                <p className='tollfreeno'>+91 324 333 2443</p>
            </div>
            <div className="column-2 footer-col">
                <p className="heading">Company</p>
                <p className='footer-p'>About us</p>
                <p className='footer-p'>Careers</p>
            </div>
            <div className="column-3 footer-col">
                <p className="heading">Support</p>
                <p className='footer-p'>Contact</p>
                <p className='footer-p'>Legal notice</p>
            </div>
        </div>
        </>
    )
}