import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Shop() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Our <span className="text-primary">Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Level up your architecture skills with our premium, industry-standard courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRODUCTS.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col group border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="aspect-video relative overflow-hidden bg-zinc-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  90% OFF
                </div>
              </div>
              <CardContent className="p-6 flex-1">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {product.description}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-primary">₹{product.price}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{product.price * 10}</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                <Button className="w-full text-base py-5 shadow-md shadow-primary/20" onClick={() => navigate(`/checkout?product=${product.id}`)}>
                  Buy Now — ₹{product.price} <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/product/${product.id}`}>View Course Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
