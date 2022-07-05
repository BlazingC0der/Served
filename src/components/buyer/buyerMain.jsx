import ServiceSelect from './purchase'
const BuyerMain = () => (
    <>
        <route path="buyer/" exact component="" />
        <route path="buyer/purchase" component={ ServiceSelect }/>
    </>
)

export default BuyerMain