import {Button, Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";


export function CardPlacehoderSkeleton() {
    const width=window.innerWidth

    return (
        <Card className="w-full bg-transparent shadow-none animate-pulse">
<div className="grid lg:grid-cols-3 sm:grid-cols-1">

    {Array.from({length:width < 600 ? 1 : 3}).map((index)=>
        <CardHeader key={index}
            shadow={false}
            floated={false}
            className="relative grid h-56 place-items-center bg-[#121212]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
            </svg>
        </CardHeader>
    )}
</div>
            <CardBody>
                <Typography
                    as="div"
                    variant="h1"
                    className="mb-4 h-3 w-56 rounded-full bg-[#121212]"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-full rounded-full bg-[#121212]"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-full rounded-full bg-[#121212]"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-full rounded-full bg-[#121212]"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-full rounded-full bg-[#121212]"
                >
                    &nbsp;
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex gap-2 place-items-end w-full justify-end">
                <Button
                    disabled
                    tabIndex={-1}
                    className="h-8 w-20 bg-[#121212] shadow-none hover:shadow-none"
                >
                    &nbsp;
                </Button>
                <Button
                    disabled
                    tabIndex={-1}
                    className="h-8 w-20 bg-[#121212] shadow-none hover:shadow-none"
                >
                    &nbsp;
                </Button>
            </CardFooter>
        </Card>
    );
}