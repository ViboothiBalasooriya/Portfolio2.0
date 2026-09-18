import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  children, 
  as: Tag = 'p', 
  className = '', 
  style = {},
  delay = 0 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 }, // We hide the container initially to avoid layout flash
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      }
    }
  };

  const wordVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { 
      y: '0%', 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Recursively process children to wrap text nodes in mask containers
  const processChildren = (node) => {
    if (typeof node === 'string' || typeof node === 'number') {
      const words = String(node).split(/(\s+)/);
      return words.map((word, index) => {
        if (word.trim() === '') {
          return <React.Fragment key={index}>{word}</React.Fragment>;
        }
        return (
          <span 
            key={index} 
            className="word-wrapper" 
            style={{ 
              display: 'inline-block', 
              overflow: 'hidden', 
              verticalAlign: 'bottom',
              paddingTop: '0.1em' // prevent clipping tall letters
            }}
          >
            <motion.span 
              className="word-inner" 
              variants={wordVariants}
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            >
              {word}
            </motion.span>
          </span>
        );
      });
    }

    if (React.isValidElement(node)) {
      return React.cloneElement(
        node,
        { key: node.key || Math.random() },
        processChildren(node.props.children)
      );
    }

    if (Array.isArray(node)) {
      return node.map((child, index) => (
        <React.Fragment key={index}>{processChildren(child)}</React.Fragment>
      ));
    }

    return node;
  };

  const MotionTag = motion.create ? motion.create(Tag) : motion[Tag] || motion.div;

  return (
    <MotionTag 
      className={className} 
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {processChildren(children)}
    </MotionTag>
  );
};

export default AnimatedText;
