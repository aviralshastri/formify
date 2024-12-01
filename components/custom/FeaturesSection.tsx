import { Infinity, MessagesSquare, Zap, ZoomIn } from 'lucide-react';

const feature = [
  {
    title: 'Smart Form Design',
    description:
      'Leverage AI to automatically design forms based on your needs, reducing manual effort and ensuring user-friendly layouts.',
    icon: <ZoomIn className="size-6" />,
  },
  {
    title: 'AI-Powered Suggestions',
    description:
      'Get real-time AI-driven suggestions for field types, layouts, and validations to optimize form performance.',
    icon: <Zap className="size-6" />,
  },
  {
    title: '24/7 Customer Support',
    description:
      'Our dedicated support team is available round-the-clock to assist with any issues or custom requirements.',
    icon: <MessagesSquare className="size-6" />,
  },
  {
    title: 'Seamless Integration',
    description:
      'Integrate your forms effortlessly with popular tools and platforms for a smooth data flow.',
    icon: <Infinity className="size-6" />,
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20" id="features">
      <div className="container">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <p className="text-sm text-muted-foreground">WHY CHOOSE US</p>
            <h2 className="text-3xl font-medium md:text-5xl">
              Transforming Form Creation with AI-Powered Solutions
            </h2>

            <p className="text-muted-foreground md:max-w-2xl">
              Experience the future of form building with our AI-driven platform that simplifies design, enhances usability, and delivers exceptional results.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
          {feature.map((feature, idx) => (
            <div
              className="flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8"
              key={idx}
            >
              <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-lg font-medium md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
