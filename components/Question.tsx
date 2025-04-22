'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Option = {
  text: string;
  isCorrect?: boolean;
  image?: string | null;
};

type QuestionProps = {
  text: string;
  image?: string | null;
  options: Option[];
  explanation?: string;
};

const QuestionCard: React.FC<QuestionProps> = ({ text, image, options, explanation }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 space-y-4 shadow-lg rounded-2xl">
      <CardContent>
        <div className="space-y-4">
          {/* Question text */}
          <h2 className="text-xl font-semibold">{text}</h2>

          {/* Question image */}
          {image && (
            <div className="relative w-full max-w-md h-64 mx-auto">
              <Image
                src={image}
                alt="Question"
                fill
                className="object-contain rounded-md"
              />
            </div>
          )}

          {/* Options */}
          <RadioGroup
            onValueChange={(value) => setSelectedOption(value)}
            className="space-y-3"
          >
            {options.map((opt, index) => (
              <div key={index} className="flex items-start gap-4">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex flex-col gap-2">
                  <span className="text-base">{opt.text}</span>
                  {opt.image && (
                    <div className="relative w-52 h-40 mt-1">
                      <Image
                        src={opt.image}
                        alt={`Option ${index + 1}`}
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Explanation (optional) */}
          {explanation && selectedOption !== null && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-md">
              <p className="text-sm text-blue-900 font-medium">Explanation:</p>
              <p className="text-sm text-blue-800">{explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
