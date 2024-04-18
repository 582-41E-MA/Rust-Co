import { AppContext } from '../App/App';
import { t } from 'i18next';

const Signature = function(){
    return(
      <div className='signature flex items-center ml-12 m-2'>
        <img src='/logo/rustcologo-ps.png' className='w-28'/>
        <h2 className='logo-font text-3xl ml-12'>L'Équipe Rust&Co</h2>
      </div>
    )
   }


   export default Signature