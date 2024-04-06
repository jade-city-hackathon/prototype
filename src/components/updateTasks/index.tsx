import { Box, Button, Grid, Heading, Image, Text } from '@chakra-ui/react';
import { useMinerLevel } from '../../store/miners';

import task1 from '../../assets/task1.svg';
import task2 from '../../assets/task2.svg';
import task3 from '../../assets/task3.svg';

import ready from '../../assets/ready.svg';

const Tasks1 = [
  {
    icon: task1,
    name: 'Upgrade task 1',
    desc: 'Complete the Level 1 Jade Education quiz',
    buttonText: 'Complete Quiz',
  },
  {
    icon: task2,
    name: 'Upgrade task 2',
    desc: 'Publish tweet using the hashtag #Jadeites.',
    buttonText: 'Publish Tweet',
  },
  {
    icon: task3,
    name: 'Upgrade task 3',
    desc: 'Lend $150 USDC to be eligible to upgrade to a Jadesmith',
    buttonText: 'Lend $150 USDC',
  },
];

const Tasks2 = [
  {
    icon: task1,
    name: 'Upgrade task 1',
    desc: 'Complete the Level 2 Jade Education quiz',
    buttonText: 'Complete Quiz',
  },
  {
    icon: task2,
    name: 'Upgrade task 2',
    desc: 'Publish a minimum 5 part-thread about Jade City.',
    buttonText: 'Publish 5 Tweets',
  },
  {
    icon: task3,
    name: 'Upgrade task 3',
    desc: 'Stake $300 USDC to be eligible to upgrade to a Trader',
    buttonText: 'Lend $300 USDC',
  },
];

const UpdateTasks = () => {
  const {
    minerLevel,
    completeTask1,
    completeTask2,
    completeTask3,
    setCompleteTask1,
    setCompleteTask2,
    setCompleteTask3,
  } = useMinerLevel((state) => state);

  const completeTasks = [completeTask1, completeTask2, completeTask3];

  const setCompleteTasks = [
    setCompleteTask1,
    setCompleteTask2,
    setCompleteTask3,
  ];

  const completeTask = (index: number) => {
    setCompleteTasks[index]?.(true);
  };

  return (
    <>
      {(minerLevel === 'second' ? Tasks1 : Tasks2).map((task, index) => (
        <Grid
          key={`task_${index}`}
          p="25px"
          bgGradient="linear(to-tr, #1d322a 20%,  rgba(73, 131, 110, 0.4) 80%)"
          rowGap="20px"
        >
          <Box position="relative" w="70px">
            <Image src={task.icon} alt={`task_${index}`} mb="15px" />

            {completeTasks[index] && (
              <Image
                position="absolute"
                bottom="15px"
                right="0"
                src={ready}
                alt="ready"
              />
            )}
          </Box>

          <Heading
            variant="h1"
            fontSize="20px"
            textTransform="uppercase"
            opacity="0.8"
          >
            {task.name}
          </Heading>

          <Text variant="subTitle">{task.desc}</Text>

          <Button
            mt="15px"
            variant="main"
            opacity="0.9"
            isDisabled={completeTasks[index] || false}
            onClick={() => completeTask(index)}
          >
            {completeTasks[index] ? 'TASK COMPLETE' : task.buttonText}
          </Button>
        </Grid>
      ))}
    </>
  );
};

export default UpdateTasks;
