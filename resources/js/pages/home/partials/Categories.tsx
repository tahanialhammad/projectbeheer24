import PrimaryButton from '@/components/PrimaryButton';
import CountdownTimer from './CountdownTimer';
import AnimatedWrapper from '@/components/AnimatedWrapper';

export default function Categories({ initialTime }) {
    const categories = [
        {
            name: 'Website bouwen',
            image: './images/wired-outline-27-globe-hover-rotate.gif',
            description: 'WordPress website of webshop op maat',
        },
        {
            name: 'Software Ontwikkeling',
            image: './images/wired-outline-742-code-hover-pinch.gif',
            description: 'Laravel-apps met moderne technologieën',
        },
        {
            name: 'Vindbaar op Google (SEO)',
            image: './images/wired-gradient-19-magnifier-zoom-search-hover-spin.gif',
            description: 'Zichtbaar in Google & Bing',
        },
        {
            name: 'Merkidentiteit',
            image: './images/wired-outline-54-photo-hover-pinch.gif',
            description: 'Logo’s, pictogrammen & meer',
        },
    ];

    return (
        <div className="my-6 flex flex-row gap-4">
            <div className="relative w-1/2 rounded-3xl bg-fuchsia-200 px-4 pt-4 text-center capitalize">
                <h3 className="mt-4 text-lg font-bold tracking-tight text-red-500 uppercase">25% korting</h3>
                <h1 className="text-3xl font-bold text-gray-900">op de aanbieding van de dag</h1>
                <h3 className="text-2xl font-bold text-gray-900">Black Friday</h3>
                <CountdownTimer initialTime={initialTime} />
                <PrimaryButton className="mt-4">Bestel Nu</PrimaryButton>
                <img className="absolute top-2/5 left-0" src="" alt="" />
                <img className="" src=".\images\woman-working-with-laptop.png" alt="" />
            </div>
            <div className="w-1/2">
                <div className="grid grid-cols-2 gap-4 rounded-3xl border-2 p-4">
                    {categories.map((item, index) => (
                        <CategoryItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CategoryItem({ item }) {
    return (
        <AnimatedWrapper className="flex flex-col items-center gap-2">
            <img src={item.image} style={{ width: '124px', hight: '220px' }} className="m-auto max-w-full" alt="" />

            <h3 className="text-center text-2xl font-bold capitalize">{item.name}</h3>
            <p className="text-center">{item.description}</p>
        </AnimatedWrapper>
    );
}
