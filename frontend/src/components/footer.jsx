import '../styles/footer.css';
import { Instagram, Twitter, Youtube } from 'lucide-react';

function Footer() {
    return (
        <footer>
            <div className="div-redes-sociais">
            <Instagram className='icon-redes-sociais'/>
            <Twitter className='icon-redes-sociais'/>
            <Youtube className='icon-redes-sociais'/>
            </div>
            <div className="div-informacoes">
                <p>Termos de Licença e Política de Privacidade</p>
                <p>Todos os direitos reservados para &copy;PetSystem</p>
            </div>
        </footer>
    )
}

export default Footer;