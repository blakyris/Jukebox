<?php

namespace App\Controller\API\Player;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Track;
use App\Document\Artist;
use App\Document\Album;

class StreamController
{
    /**
     * @Route("/api/stream/track/{id}", methods={"GET"})
     */
    public function searchArtist(DocumentManager $dm, $id)
    {
        $track = $dm->getRepository(Track::class)->find($id);

        return new JsonResponse($track->getFile());
    }
}
